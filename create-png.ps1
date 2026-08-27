Add-Type -AssemblyName System.Drawing

$src = "C:\Users\venka\.gemini\antigravity\scratch\narayana-haircutting-edlurupadu\assets\images\logo.jpg"
$img = [System.Drawing.Image]::FromFile($src)

$img.Save("C:\Users\venka\.gemini\antigravity\scratch\narayana-haircutting-edlurupadu\assets\images\logo.png", [System.Drawing.Imaging.ImageFormat]::Png)
$img.Save("C:\Users\venka\.gemini\antigravity\scratch\narayana-haircutting-edlurupadu\assets\logo.png", [System.Drawing.Imaging.ImageFormat]::Png)
$img.Save("C:\Users\venka\.gemini\antigravity\scratch\narayana-haircutting-edlurupadu\logo.png", [System.Drawing.Imaging.ImageFormat]::Png)

$img.Dispose()
Write-Host "PNG logo files generated successfully!"
