import subprocess, json
result = subprocess.run(['gog', 'mail', 'search', 'category:promotions', 'newer_than:7d', '--json'], capture_output=True, text=True)
data = json.loads(result.stdout)
if 'threads' in data:
    senders = {}
    for thread in data['threads'][:50]:
        from_email = thread.get('from', '')
        if '@' in from_email:
            domain = from_email.split('@')[1].split('>')[0].strip()
            senders[domain] = senders.get(domain, 0) + 1
    
    print("\n=== TOP PROMOTIONAL SENDERS (Last 7 days) ===\n")
    for domain, count in sorted(senders.items(), key=lambda x: x[1], reverse=True)[:20]:
        print(f"{count:3d}x  {domain}")
