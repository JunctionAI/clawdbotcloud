# Klaviyo API Reference

## Available MCP Tools

These Klaviyo tools are available via MCP integration:

### Campaigns

#### Get Campaigns
```python
klaviyo_get_campaigns(
    channel="email",  # or "sms"
    filters=[...],    # optional filters
    fields=[...]      # optional field selection
)
```

#### Get Single Campaign
```python
klaviyo_get_campaign(id="CAMPAIGN_ID")
```

#### Create Campaign
```python
klaviyo_create_campaign(input={
    "type": "campaign",
    "attributes": {
        "name": "Campaign Name",
        "channel": "email",
        "audiences": {
            "included": ["LIST_ID"],
            "excluded": ["SEGMENT_ID"]  # optional
        }
    }
})
```

**View in Klaviyo UI:** `https://www.klaviyo.com/campaign/{CAMPAIGN_ID}/wizard`

---

### Templates

#### Get Template
```python
klaviyo_get_email_template(templateId="TEMPLATE_ID")
```

#### Create Template
```python
klaviyo_create_email_template(
    name="Template Name",
    html="<html>...</html>",
    hasEditableRegions=False  # set True for drag-drop editing
)
```

**View in Klaviyo UI:** `https://www.klaviyo.com/email-editor/{TEMPLATE_ID}/edit`

#### Assign Template to Campaign
```python
klaviyo_assign_template_to_campaign_message(
    campaignMessageId="MESSAGE_ID",
    emailTemplateId="TEMPLATE_ID"
)
```

---

### Lists & Segments

#### Get Lists
```python
klaviyo_get_lists(
    fields=["name", "created"],
    filter=[...]
)
```

#### Get Single List
```python
klaviyo_get_list(id="LIST_ID", includeProfileCount=True)
```

**View in Klaviyo UI:** `https://www.klaviyo.com/lists/{LIST_ID}`

#### Get Segments
```python
klaviyo_get_segments(
    fields=["name", "created"],
    filters=[...]
)
```

#### Get Single Segment
```python
klaviyo_get_segment(segmentId="SEGMENT_ID", includeProfileCount=True)
```

---

### Profiles

#### Get Profiles
```python
klaviyo_get_profiles(
    filters=[...],
    fields=["email", "first_name", "last_name"],
    pageSize=20
)
```

#### Get Single Profile
```python
klaviyo_get_profile(id="PROFILE_ID")
```

**View in Klaviyo UI:** `https://www.klaviyo.com/profile/{PROFILE_ID}`

#### Create Profile
```python
klaviyo_create_profile(input={
    "type": "profile",
    "attributes": {
        "email": "email@example.com",
        "first_name": "John",
        "last_name": "Doe"
    }
})
```

#### Update Profile
```python
klaviyo_update_profile(input={
    "type": "profile",
    "id": "PROFILE_ID",
    "attributes": {
        "first_name": "Updated Name"
    }
})
```

#### Subscribe Profile
```python
klaviyo_subscribe_profile_to_marketing(
    emailAddress="email@example.com",
    listId="LIST_ID",
    channels=["email"]  # or ["sms"] or both
)
```

#### Unsubscribe Profile
```python
klaviyo_unsubscribe_profile_from_marketing(
    emailAddress="email@example.com",
    listId="LIST_ID",
    channels=["email"]
)
```

---

### Reporting & Analytics

#### Campaign Report
```python
klaviyo_get_campaign_report(
    statistics=["opens", "clicks", "conversions", "revenue"],
    timeframe={"key": "last_30_days"},
    filters=[...]  # optional campaign filters
)
```

**Available statistics:**
- `opens`, `unique_opens`, `open_rate`
- `clicks`, `unique_clicks`, `click_rate`
- `conversions`, `conversion_rate`
- `revenue`, `revenue_per_recipient`
- `unsubscribes`, `bounces`, `spam_complaints`

#### Flow Report
```python
klaviyo_get_flow_report(
    statistics=["opens", "clicks", "conversions", "revenue"],
    timeframe={"key": "last_30_days"},
    filters=[...]
)
```

---

### Flows

#### Get Flows
```python
klaviyo_get_flows(
    fields=["name", "status", "trigger_type"],
    filters=[...]
)
```

#### Get Single Flow
```python
klaviyo_get_flow(id="FLOW_ID")
```

**View in Klaviyo UI:** `https://www.klaviyo.com/flow/{FLOW_ID}/edit`

---

### Metrics

#### Get Metrics
```python
klaviyo_get_metrics(
    fields=["name", "integration"],
    filter=[...]
)
```

#### Get Single Metric
```python
klaviyo_get_metric(metricId="METRIC_ID")
```

---

### Events

#### Get Events
```python
klaviyo_get_events(
    filter=["equals(profile_id,'PROFILE_ID')"],
    fields=["event_properties", "datetime"],
    sort="-datetime"  # newest first
)
```

---

### Catalog

#### Get Catalog Items
```python
klaviyo_get_catalog_items(
    fields=["title", "price", "url"],
    filter=[...],
    sort="-created"
)
```

---

### Images

#### Upload Image
```python
klaviyo_upload_image_from_url(
    imageURL="https://example.com/image.jpg",
    name="Image Name"
)
```

---

### Account

#### Get Account Details
```python
klaviyo_get_account_details()
```

**View settings:** `https://www.klaviyo.com/settings/account`

---

## Common Workflows

### Create and Send Campaign

```python
# 1. Create campaign
campaign = klaviyo_create_campaign(input={
    "type": "campaign",
    "attributes": {
        "name": "Flash Sale - Feb 2026",
        "channel": "email",
        "audiences": {
            "included": ["LIST_ID"]
        }
    }
})

# 2. Create template
template = klaviyo_create_email_template(
    name="Flash Sale Template",
    html=html_content
)

# 3. Get campaign message ID (from campaign response)
# 4. Assign template to campaign
klaviyo_assign_template_to_campaign_message(
    campaignMessageId=message_id,
    emailTemplateId=template["id"]
)

# 5. Review in Klaviyo UI before sending
# https://www.klaviyo.com/campaign/{CAMPAIGN_ID}/wizard
```

### Analyse Campaign Performance

```python
# Get report for specific campaigns
report = klaviyo_get_campaign_report(
    statistics=[
        "unique_opens", "open_rate",
        "unique_clicks", "click_rate",
        "conversions", "revenue"
    ],
    timeframe={"key": "last_7_days"},
    filters=[{"field": "name", "operator": "contains", "value": "Flash"}]
)
```

### Find Customer by Email

```python
profiles = klaviyo_get_profiles(
    filters=["equals(email,'customer@example.com')"]
)
```
