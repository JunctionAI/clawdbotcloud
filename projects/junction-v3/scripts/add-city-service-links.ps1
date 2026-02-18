
# Add service page links to all city page service cards
# Run from: C:\Users\Nightgalem\clawd\projects\junction-v3

$cityDirs = @(
  'auckland', 'christchurch', 'wellington', 'hamilton', 'tauranga',
  'dunedin', 'rotorua', 'napier', 'queenstown', 'palmerston-north',
  'whangarei', 'nelson', 'new-plymouth', 'invercargill', 'new-zealand'
)

$changed = 0

foreach ($city in $cityDirs) {
  $file = "src\app\$city\page.tsx"
  if (-not (Test-Path $file)) {
    Write-Host "SKIP: $file (not found)" -ForegroundColor Yellow
    continue
  }
  
  $content = Get-Content $file -Raw
  
  # Skip if already has link properties on service cards
  if ($content -match "link: '/services/fractional-cmo'") {
    Write-Host "SKIP: $city (already updated)" -ForegroundColor Cyan
    continue
  }

  # 1. Add link properties to service cards
  $content = $content -replace "title: 'Fractional CMO',", "title: 'Fractional CMO', link: '/services/fractional-cmo',"
  $content = $content -replace "title: 'AI Marketing Systems',", "title: 'AI Marketing Systems', link: '/services/ai-marketing-systems',"
  $content = $content -replace "title: 'Paid Advertising',", "title: 'Paid Advertising', link: '/services/google-ads-nz',"
  $content = $content -replace "title: 'Growth Strategy',", "title: 'Growth Strategy', link: '/services/',"

  # 2. Change card rendering from <div> to <Link href={service.link}>
  $oldMap = '<div key={service.title} className="p-6 border border-gray-100 rounded-2xl">'
  $newMap = '<Link key={service.title} href={service.link} className="p-6 border border-gray-100 rounded-2xl hover:border-gray-400 transition-colors block">'
  $content = $content.Replace($oldMap, $newMap)

  # 3. Close with </Link> instead of </div> for the service card
  # We need to replace the closing </div> that corresponds to the service card
  # Pattern: after the <p> closing tag, close with </Link>
  $oldClose = "              <p className=`"text-gray-600 text-sm leading-relaxed`">{service.desc}</p>`n            </div>"
  $newClose = "              <p className=`"text-gray-600 text-sm leading-relaxed`">{service.desc}</p>`n            </Link>"
  $content = $content.Replace($oldClose, $newClose)

  Set-Content $file $content -NoNewline
  Write-Host "UPDATED: $city" -ForegroundColor Green
  $changed++
}

Write-Host "`n$changed files updated." -ForegroundColor Magenta
