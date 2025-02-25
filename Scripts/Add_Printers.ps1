# Get local IP address
$localIp = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.PrefixLength -eq 24}).IPAddress

# Extract the network subnet (e.g., 192.168.1.0)
$subnet = $localIp.Split('.')[0..2] -join '.'

# List of common printer ports
$printerPorts = @('9100')

# Printer driver to use (Make sure the driver is installed on your computer)
$printerDriver = "Microsoft IPP Class Driver"  # Change this to the specific driver name for the printer

# Function to test if a port is open on a host
function Test-Port {
    param (
        [string]$ipAddress,
        [int]$port
    )
    try {
        $tcpConnection = Test-NetConnection -ComputerName $ipAddress -Port $port
        return $tcpConnection.TcpTestSucceeded
    } catch {
        return $false
    }
}

# Function to scan the network for printers
function Scan-NetworkForPrinters {
    param (
        [string]$subnet,
        [array]$ports
    )

    # Scan IP range from .1 to .254
    for ($i = 100; $i -le 254; $i++) {
        $ip = "$subnet.$i"
        Write-Host "`nPinging $ip..."

        # Test if the host is reachable
        $pingResult = Test-Connection -ComputerName $ip -Count 1 -Quiet
        if ($pingResult) {
            Write-Host "`n$ip is reachable."
            foreach ($port in $ports) {
                Write-Host "`nChecking port $port on $ip..."
                $portOpen = Test-Port -ipAddress $ip -port $port
                if ($portOpen) {
                    Write-Host "Printer found at $ip on port $port"
                    # Add the printer to the system
                    Add-PrinterPort -Name "IP_$ip" -PrinterHostAddress $ip
                    Add-Printer -Name "Printer_$ip" -DriverName $printerDriver -PortName "IP_$ip"
                    Write-Host "`nAdded printer at $ip."
                }
            }
        }
    }
}

# Run the scan and add printers
Scan-NetworkForPrinters -subnet $subnet -ports $printerPorts
