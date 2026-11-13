Add-Type -AssemblyName System.Drawing

$outputPath = Join-Path $PSScriptRoot '..\public\exhibits\Network_Topology_Configuration_Diagram_1792538891.png'
$outputPath = [System.IO.Path]::GetFullPath($outputPath)
$width = 1800
$height = 1250
$bitmap = New-Object System.Drawing.Bitmap($width, $height)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit

$white = [System.Drawing.Brushes]::White
$darkBlue = [System.Drawing.Color]::FromArgb(20, 55, 115)
$ink = [System.Drawing.Color]::FromArgb(20, 32, 50)
$muted = [System.Drawing.Color]::FromArgb(75, 92, 112)
$panel = [System.Drawing.Color]::FromArgb(244, 247, 251)
$border = [System.Drawing.Color]::FromArgb(115, 135, 160)
$accent = [System.Drawing.Color]::FromArgb(26, 95, 170)
$red = [System.Drawing.Color]::FromArgb(190, 45, 45)
$green = [System.Drawing.Color]::FromArgb(20, 120, 75)

function New-Font([string]$family, [float]$size, [System.Drawing.FontStyle]$style = [System.Drawing.FontStyle]::Regular) {
  New-Object System.Drawing.Font($family, $size, $style, [System.Drawing.GraphicsUnit]::Pixel)
}

function Draw-Text([string]$text, [float]$x, [float]$y, [System.Drawing.Font]$font, [System.Drawing.Brush]$brush) {
  $graphics.DrawString($text, $font, $brush, $x, $y)
}

function Draw-CodeBlock([string]$heading, [string[]]$lines, [float]$x, [float]$y, [float]$w, [float]$h) {
  $graphics.FillRectangle((New-Object System.Drawing.SolidBrush($panel)), $x, $y, $w, $h)
  $graphics.DrawRectangle((New-Object System.Drawing.Pen($border, 2)), $x, $y, $w, $h)
  Draw-Text $heading ($x + 24) ($y + 18) (New-Font 'Arial' 28 ([System.Drawing.FontStyle]::Bold)) (New-Object System.Drawing.SolidBrush($accent))
  $codeFont = New-Font 'Consolas' 22
  $lineY = $y + 68
  foreach ($line in $lines) {
    Draw-Text $line ($x + 24) $lineY $codeFont (New-Object System.Drawing.SolidBrush($ink))
    $lineY += 31
  }
}

try {
  $graphics.Clear([System.Drawing.Color]::White)

  $graphics.FillRectangle((New-Object System.Drawing.SolidBrush($darkBlue)), 0, 0, $width, 92)
  Draw-Text 'Question #102' 42 23 (New-Font 'Arial' 42 ([System.Drawing.FontStyle]::Bold)) $white

  $graphics.DrawRectangle((New-Object System.Drawing.Pen($ink, 4)), 36, 120, $width - 72, $height - 156)

  Draw-Text 'Exhibit' 72 150 (New-Font 'Arial' 32 ([System.Drawing.FontStyle]::Bold)) (New-Object System.Drawing.SolidBrush($red))
  Draw-Text 'PC1 to R2 static NAT path' 72 194 (New-Font 'Arial' 25 ([System.Drawing.FontStyle]::Regular)) (New-Object System.Drawing.SolidBrush($muted))

  # Network diagram
  $linePen = New-Object System.Drawing.Pen($ink, 5)
  $graphics.DrawLine($linePen, 275, 310, 680, 310)
  $graphics.DrawLine($linePen, 930, 310, 1390, 310)
  $graphics.FillEllipse((New-Object System.Drawing.SolidBrush($accent)), 660, 270, 280, 80)
  $graphics.DrawEllipse((New-Object System.Drawing.Pen($ink, 4)), 660, 270, 280, 80)
  $graphics.FillEllipse((New-Object System.Drawing.SolidBrush($accent)), 1400, 270, 190, 80)
  $graphics.DrawEllipse((New-Object System.Drawing.Pen($ink, 4)), 1400, 270, 190, 80)
  $routerFont = New-Font 'Arial' 30 ([System.Drawing.FontStyle]::Bold)
  Draw-Text 'R1' 775 290 $routerFont $white
  Draw-Text 'R2' 1468 290 $routerFont $white
  Draw-Text 'PC1' 128 342 (New-Font 'Arial' 30 ([System.Drawing.FontStyle]::Bold)) (New-Object System.Drawing.SolidBrush($ink))
  $pcPen = New-Object System.Drawing.Pen($ink, 4)
  $graphics.DrawRectangle($pcPen, 115, 220, 130, 82)
  $graphics.DrawLine($pcPen, 180, 302, 180, 335)
  $graphics.DrawLine($pcPen, 135, 335, 225, 335)
  Draw-Text '172.16.29.78' 72 378 (New-Font 'Consolas' 24) (New-Object System.Drawing.SolidBrush($ink))
  Draw-Text '172.16.29.0/24' 382 270 (New-Font 'Consolas' 25 ([System.Drawing.FontStyle]::Bold)) (New-Object System.Drawing.SolidBrush($green))
  Draw-Text '10.139.91.0/24' 1045 270 (New-Font 'Consolas' 25 ([System.Drawing.FontStyle]::Bold)) (New-Object System.Drawing.SolidBrush($green))

  $r1Lines = @(
    'interface FastEthernet0/0',
    ' ip nat inside',
    ' ip address 172.16.29.1 255.255.255.0',
    'interface FastEthernet1/0',
    ' ip nat outside',
    ' ip address 10.139.91.1 255.255.255.0',
    'ip nat pool NAT_POOL 10.139.91.1 10.139.91.10',
    'access-list 1 permit 172.16.29.0 0.0.0.255',
    'ip nat inside source list 1 pool NAT_POOL'
  )
  $r2Lines = @(
    'interface FastEthernet0/0',
    ' ip address 10.139.91.2 255.255.255.0',
    'ip route 172.16.29.0 255.255.255.0 10.139.91.1',
    '!',
    'Loopback0: destination reachable through R2'
  )
  Draw-CodeBlock 'R1 configuration' $r1Lines 72 430 810 420
  Draw-CodeBlock 'R2 configuration' $r2Lines 930 430 798 260
  $bitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
} finally {
  $graphics.Dispose()
  $bitmap.Dispose()
}

Write-Output $outputPath
