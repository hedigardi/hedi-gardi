param(
  [string]$BackgroundPath = "assets/images/bg.jpg",
  [string]$OutputPath = "assets/images/og-image-1200x630.jpg",
  [string]$Title = "Hedi Gardi",
  [string]$Subtitle = "Blockchain & Fullstack Developer",
  [int]$Width = 1200,
  [int]$Height = 630,
  [int]$Quality = 88
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Drawing

if (-not (Test-Path -LiteralPath $BackgroundPath)) {
  throw "Background image not found: $BackgroundPath"
}

$outputDirectory = Split-Path -Path $OutputPath -Parent
if (-not [string]::IsNullOrWhiteSpace($outputDirectory) -and -not (Test-Path -LiteralPath $outputDirectory)) {
  New-Item -ItemType Directory -Path $outputDirectory | Out-Null
}

$bitmap = New-Object System.Drawing.Bitmap $Width, $Height
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$resolvedBackgroundPath = (Resolve-Path -LiteralPath $BackgroundPath).Path
$sourceImage = [System.Drawing.Image]::FromFile($resolvedBackgroundPath)

try {
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

  # Scale and crop to fill target size while preserving aspect ratio.
  $scale = [Math]::Max($Width / $sourceImage.Width, $Height / $sourceImage.Height)
  $scaledWidth = [int][Math]::Ceiling($sourceImage.Width * $scale)
  $scaledHeight = [int][Math]::Ceiling($sourceImage.Height * $scale)
  $offsetX = [int](($scaledWidth - $Width) / 2)
  $offsetY = [int](($scaledHeight - $Height) / 2)

  $graphics.DrawImage(
    $sourceImage,
    (New-Object System.Drawing.Rectangle (-$offsetX), (-$offsetY), $scaledWidth, $scaledHeight)
  )

  $overlayBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(95, 10, 18, 32))
  $whiteBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(245, 255, 255, 255))

  try {
    $graphics.FillRectangle($overlayBrush, 0, 0, $Width, $Height)

    $titleFont = New-Object System.Drawing.Font("Segoe UI", 54, [System.Drawing.FontStyle]::Bold)
    $subtitleFont = New-Object System.Drawing.Font("Segoe UI", 30, [System.Drawing.FontStyle]::Regular)

    try {
      $graphics.DrawString($Title, $titleFont, $whiteBrush, 80, 215)
      $graphics.DrawString($Subtitle, $subtitleFont, $whiteBrush, 82, 300)
    }
    finally {
      $titleFont.Dispose()
      $subtitleFont.Dispose()
    }
  }
  finally {
    $overlayBrush.Dispose()
    $whiteBrush.Dispose()
  }

  $jpgEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
    Where-Object { $_.MimeType -eq "image/jpeg" }

  if (-not $jpgEncoder) {
    throw "JPEG encoder not available on this system."
  }

  $clampedQuality = [Math]::Max(1, [Math]::Min(100, $Quality))
  $encoder = [System.Drawing.Imaging.Encoder]::Quality
  $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter($encoder, [long]$clampedQuality)

  $bitmap.Save($OutputPath, $jpgEncoder, $encoderParams)
}
finally {
  $graphics.Dispose()
  $sourceImage.Dispose()
  $bitmap.Dispose()
}

$result = Get-Item -LiteralPath $OutputPath
Write-Output ("Generated OG image: {0} ({1} bytes)" -f $result.FullName, $result.Length)
