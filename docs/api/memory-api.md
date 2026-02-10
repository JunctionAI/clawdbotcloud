# Memory API

Store and retrieve user context to enable personalized, context-aware AI interactions.

---

## Overview

The Memory API provides persistent storage for user context, including:

- **Facts** - Preferences, personal info, learned information
- **Entities** - People, projects, companies the user interacts with
- **Relationships** - Connections between entities

Memory enables agents to:
- Remember user preferences across conversations
- Reference past interactions and decisions
- Track relationships and project context
- Provide personalized responses

---

## Memory Limits by Tier

| Tier | Facts | Entities | Storage | Retention |
|------|-------|----------|---------|-----------|
| **Starter** | 100 | 50 | 50 KB | 30 days |
| **Professional** | 500 | 200 | 100 KB | 90 days |
| **Enterprise** | Unlimited | Unlimited | Unlimited | 1 year |

---

## Get All Memory

Retrieve all stored memory for a user.

```http
GET /v1/memory
```

### Request

```bash
curl -X GET "https://api.clawdbot.com/v1/memory?agent_id=agent_abc123&user_id=user_123" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `agent_id` | string | Yes | Agent identifier |
| `user_id` | string | Yes | User identifier |

### Response

```json
{
  "success": true,
  "data": {
    "user_id": "user_123",
    "agent_id": "agent_abc123",
    "facts": [
      {
        "id": "fact_001",
        "content": "Prefers email notifications over SMS",
        "category": "preference",
        "source": "conversation",
        "created_at": "2026-01-15T10:00:00Z"
      },
      {
        "id": "fact_002",
        "content": "Works at Acme Corp as VP of Engineering",
        "category": "work",
        "source": "conversation",
        "created_at": "2026-01-16T14:30:00Z"
      },
      {
        "id": "fact_003",
        "content": "Has meeting-free Fridays policy",
        "category": "preference",
        "source": "calendar",
        "created_at": "2026-01-17T09:00:00Z"
      }
    ],
    "entities": [
      {
        "id": "entity_001",
        "name": "John Smith",
        "type": "person",
        "description": "CEO at Acme Corp",
        "attributes": {
          "email": "john@acme.com",
          "relationship": "manager"
        },
        "created_at": "2026-01-15T10:00:00Z"
      },
      {
        "id": "entity_002",
        "name": "Q1 Launch",
        "type": "project",
        "description": "Product launch scheduled for March",
        "attributes": {
          "deadline": "2026-03-15",
          "status": "on_track"
        },
        "created_at": "2026-01-20T08:00:00Z"
      }
    ],
    "stats": {
      "fact_count": 3,
      "entity_count": 2,
      "storage_used_kb": 12,
      "storage_limit_kb": 100
    },
    "created_at": "2026-01-15T10:00:00Z",
    "updated_at": "2026-01-27T10:30:00Z"
  }
}
```

---

## Add a Fact

Store a new fact in user memory.

```http
POST /v1/memory/facts
```

### Request

```bash
curl -X POST https://api.clawdbot.com/v1/memory/facts \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "agent_id": "agent_abc123",
    "user_id": "user_123",
    "fact": "Prefers morning meetings before 11am",
    "category": "preference",
    "source": "direct_input"
  }'
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `agent_id` | string | Yes | Agent identifier |
| `user_id` | string | Yes | User identifier |
| `fact` | string | Yes | The fact to store (max 1000 chars) |
| `category` | string | No | Category: `preference`, `personal`, `work`, `general` |
| `source` | string | No | Where this fact was learned |

### Response

```json
{
  "success": true,
  "data": {
    "id": "fact_004",
    "content": "Prefers morning meetings before 11am",
    "category": "preference",
    "source": "direct_input",
    "created_at": "2026-01-27T10:30:00Z"
  }
}
```

---

## Delete a Fact

Remove a specific fact from memory.

```http
DELETE /v1/memory/facts/{fact_id}
```

### Request

```bash
curl -X DELETE https://api.clawdbot.com/v1/memory/facts/fact_004 \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Response

```
HTTP/1.1 204 No Content
```

---

## List Entities

Get all stored entities.

```http
GET /v1/memory/entities
```

### Request

```bash
curl -X GET "https://api.clawdbot.com/v1/memory/entities?agent_id=agent_abc123&user_id=user_123&type=person" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `agent_id` | string | Yes | Agent identifier |
| `user_id` | string | Yes | User identifier |
| `type` | string | No | Filter by type: `person`, `project`, `company`, `location`, `other` |

### Response

```json
{
  "success": true,
  "data": {
    "entities": [
      {
        "id": "entity_001",
        "name": "John Smith",
        "type": "person",
        "description": "CEO at Acme Corp",
        "attributes": {
          "email": "john@acme.com",
          "phone": "+1-555-0100",
          "relationship": "manager",
          "notes": "Prefers Friday meetings"
        },
        "relations": [
          {
            "entity_id": "entity_003",
            "relation_type": "works_at"
          }
        ],
        "created_at": "2026-01-15T10:00:00Z",
        "updated_at": "2026-01-25T14:00:00Z"
      },
      {
        "id": "entity_002",
        "name": "Sarah Johnson",
        "type": "person",
        "description": "Product Manager",
        "attributes": {
          "email": "sarah@acme.com",
          "relationship": "colleague"
        },
        "relations": [
          {
            "entity_id": "entity_003",
            "relation_type": "works_at"
          }
        ],
        "created_at": "2026-01-18T11:00:00Z"
      }
    ],
    "total": 2
  }
}
```

---

## Get Entity Details

Get detailed information about a specific entity.

```http
GET /v1/memory/entities/{entity_id}
```

### Request

```bash
curl -X GET https://api.clawdbot.com/v1/memory/entities/entity_001 \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Response

```json
{
  "success": true,
  "data": {
    "id": "entity_001",
    "name": "John Smith",
    "type": "person",
    "description": "CEO at Acme Corp, oversees product strategy",
    "attributes": {
      "email": "john@acme.com",
      "phone": "+1-555-0100",
      "linkedin": "linkedin.com/in/johnsmith",
      "relationship": "manager",
      "notes": "Prefers Friday meetings, very detail-oriented"
    },
    "relations": [
      {
        "entity_id": "entity_003",
        "entity_name": "Acme Corp",
        "relation_type": "works_at"
      },
      {
        "entity_id": "entity_004",
        "entity_name": "Q1 Launch",
        "relation_type": "owns_project"
      }
    ],
    "interaction_history": {
      "last_mentioned": "2026-01-25T14:00:00Z",
      "mention_count": 15,
      "contexts": ["meetings", "emails", "projects"]
    },
    "created_at": "2026-01-15T10:00:00Z",
    "updated_at": "2026-01-25T14:00:00Z"
  }
}
```

---

## Create Entity

Add a new entity to memory.

```http
POST /v1/memory/entities
```

### Request

```bash
curl -X POST https://api.clawdbot.com/v1/memory/entities \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "agent_id": "agent_abc123",
    "user_id": "user_123",
    "name": "TechCorp",
    "type": "company",
    "description": "Potential client in the fintech space",
    "attributes": {
      "industry": "fintech",
      "size": "500-1000",
      "website": "https://techcorp.example.com",
      "status": "lead"
    }
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "id": "entity_005",
    "name": "TechCorp",
    "type": "company",
    "description": "Potential client in the fintech space",
    "attributes": {
      "industry": "fintech",
      "size": "500-1000",
      "website": "https://techcorp.example.com",
      "status": "lead"
    },
    "relations": [],
    "created_at": "2026-01-27T10:30:00Z"
  }
}
```

---

## Update Entity

Update an existing entity.

```http
PUT /v1/memory/entities/{entity_id}
```

### Request

```bash
curl -X PUT https://api.clawdbot.com/v1/memory/entities/entity_005 \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Active client in the fintech space - signed Q1",
    "attributes": {
      "status": "client",
      "contract_value": "$50,000/year",
      "main_contact": "entity_006"
    }
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "id": "entity_005",
    "name": "TechCorp",
    "type": "company",
    "description": "Active client in the fintech space - signed Q1",
    "attributes": {
      "industry": "fintech",
      "size": "500-1000",
      "website": "https://techcorp.example.com",
      "status": "client",
      "contract_value": "$50,000/year",
      "main_contact": "entity_006"
    },
    "updated_at": "2026-01-27T10:35:00Z"
  }
}
```

---

## Delete Entity

Remove an entity from memory.

```http
DELETE /v1/memory/entities/{entity_id}
```

### Request

```bash
curl -X DELETE https://api.clawdbot.com/v1/memory/entities/entity_005 \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Response

```
HTTP/1.1 204 No Content
```

---

## Search Memory

Search across stored memory using semantic similarity.

```http
POST /v1/memory/search
```

### Request

```bash
curl -X POST https://api.clawdbot.com/v1/memory/search \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "agent_id": "agent_abc123",
    "user_id": "user_123",
    "query": "meeting preferences",
    "limit": 10,
    "threshold": 0.7
  }'
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `agent_id` | string | Yes | Agent identifier |
| `user_id` | string | Yes | User identifier |
| `query` | string | Yes | Search query |
| `limit` | integer | No | Max results (default: 10, max: 50) |
| `threshold` | number | No | Min similarity score 0-1 (default: 0.7) |
| `types` | array | No | Filter by types: `fact`, `entity` |

### Response

```json
{
  "success": true,
  "data": {
    "results": [
      {
        "type": "fact",
        "id": "fact_003",
        "content": "Has meeting-free Fridays policy",
        "score": 0.92,
        "metadata": {
          "category": "preference",
          "source": "calendar"
        }
      },
      {
        "type": "fact",
        "id": "fact_004",
        "content": "Prefers morning meetings before 11am",
        "score": 0.88,
        "metadata": {
          "category": "preference",
          "source": "direct_input"
        }
      },
      {
        "type": "entity",
        "id": "entity_001",
        "content": "John Smith - CEO at Acme Corp",
        "score": 0.75,
        "metadata": {
          "type": "person",
          "relevant_attribute": "Prefers Friday meetings"
        }
      }
    ],
    "query": "meeting preferences",
    "total_searched": 156
  }
}
```

---

## Clear All Memory

Delete all stored memory for a user.

```http
DELETE /v1/memory
```

### Request

```bash
curl -X DELETE "https://api.clawdbot.com/v1/memory?agent_id=agent_abc123&user_id=user_123" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Response

```json
{
  "success": true,
  "data": {
    "deleted": {
      "facts": 45,
      "entities": 12
    }
  }
}
```

---

## Automatic Memory

Agents automatically learn and store memory during conversations:

### Auto-learned Facts

When users mention preferences or important information, agents automatically store them:

**User:** "I prefer to schedule meetings in the afternoon"

**Agent stores:** `{ "fact": "Prefers afternoon meetings", "category": "preference", "source": "conversation" }`

### Auto-created Entities

When users mention people, companies, or projects, entities are automatically created:

**User:** "Set up a call with Sarah from Marketing about the Q2 campaign"

**Agent creates:**
- Entity: Sarah (person, Marketing department)
- Entity: Q2 Campaign (project)
- Relation: Sarah → works_on → Q2 Campaign

---

## Memory Export

Export all memory as JSON for backup or migration.

```http
GET /v1/memory/export
```

### Request

```bash
curl -X GET "https://api.clawdbot.com/v1/memory/export?agent_id=agent_abc123&user_id=user_123&format=json" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Response

Returns a JSON file download with complete memory data.

---

## Memory Import

Import memory from a JSON backup.

```http
POST /v1/memory/import
```

### Request

```bash
curl -X POST https://api.clawdbot.com/v1/memory/import \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "agent_id": "agent_abc123",
    "user_id": "user_123",
    "data": {
      "facts": [...],
      "entities": [...]
    },
    "mode": "merge"
  }'
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `mode` | string | `merge` (add to existing) or `replace` (overwrite) |

---

## Best Practices

### 1. Use Categories

Categorize facts for better organization:

```json
{
  "fact": "Allergic to shellfish",
  "category": "personal"
}
```

### 2. Link Entities

Create relationships between entities:

```json
{
  "name": "Q1 Launch",
  "type": "project",
  "relations": [
    { "entity_id": "entity_001", "relation_type": "owner" },
    { "entity_id": "entity_002", "relation_type": "contributor" }
  ]
}
```

### 3. Regular Cleanup

Periodically review and clean up outdated memory:

```bash
# Get old facts
curl -X GET "https://api.clawdbot.com/v1/memory/facts?created_before=2025-01-01"

# Delete outdated facts
curl -X DELETE "https://api.clawdbot.com/v1/memory/facts/fact_old123"
```
