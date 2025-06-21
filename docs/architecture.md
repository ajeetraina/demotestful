# Project Architecture - DemoTestFul

This document provides a detailed overview of the project architecture using Mermaid diagrams.

## System Architecture Overview

```mermaid
graph TB
    subgraph "Client Layer"
        A[Web Browser]
        B[Mobile App]
        C[Desktop App]
    end
    
    subgraph "Frontend Layer"
        D[React Application]
        E[State Management - Redux]
        F[UI Components]
    end
    
    subgraph "API Layer"
        G[API Gateway]
        H[Authentication Service]
        I[Rate Limiting]
    end
    
    subgraph "Backend Services"
        J[User Service]
        K[Product Service]
        L[Order Service]
        M[Notification Service]
    end
    
    subgraph "Data Layer"
        N[(PostgreSQL)]
        O[(Redis Cache)]
        P[(MongoDB)]
        Q[File Storage - S3]
    end
    
    subgraph "Infrastructure"
        R[Docker Containers]
        S[Kubernetes]
        T[CI/CD Pipeline]
        U[Monitoring - Prometheus]
    end
    
    A --> D
    B --> D
    C --> D
    D --> E
    D --> F
    D --> G
    G --> H
    G --> I
    G --> J
    G --> K
    G --> L
    G --> M
    J --> N
    K --> N
    L --> N
    M --> P
    J --> O
    K --> O
    L --> Q
    R --> S
    S --> T
    S --> U
```

## Development Workflow

```mermaid
flowchart LR
    A[Developer] --> B[Code Changes]
    B --> C[Git Commit]
    C --> D[GitHub Push]
    D --> E[GitHub Actions]
    E --> F{Tests Pass?}
    F -->|Yes| G[Build Image]
    F -->|No| H[Notify Developer]
    G --> I[Deploy to Staging]
    I --> J[Integration Tests]
    J --> K{Tests Pass?}
    K -->|Yes| L[Deploy to Production]
    K -->|No| M[Rollback]
    L --> N[Monitor Performance]
    H --> A
    M --> A
    
    style F fill:#ffeb3b
    style K fill:#ffeb3b
    style L fill:#4caf50
    style H fill:#f44336
    style M fill:#f44336
```

## Database Schema Relationships

```mermaid
erDiagram
    USER {
        int id PK
        string email
        string username
        string password_hash
        datetime created_at
        datetime updated_at
    }
    
    PRODUCT {
        int id PK
        string name
        string description
        decimal price
        int category_id FK
        datetime created_at
    }
    
    CATEGORY {
        int id PK
        string name
        string description
    }
    
    ORDER {
        int id PK
        int user_id FK
        decimal total_amount
        string status
        datetime created_at
    }
    
    ORDER_ITEM {
        int id PK
        int order_id FK
        int product_id FK
        int quantity
        decimal unit_price
    }
    
    USER ||--o{ ORDER : places
    ORDER ||--o{ ORDER_ITEM : contains
    PRODUCT ||--o{ ORDER_ITEM : "ordered in"
    CATEGORY ||--o{ PRODUCT : categorizes
```

## CI/CD Pipeline Flow

```mermaid
graph TD
    A[Source Code] --> B[GitHub Repository]
    B --> C[GitHub Actions Trigger]
    C --> D[Code Quality Checks]
    D --> E[Unit Tests]
    E --> F[Integration Tests]
    F --> G[Security Scan]
    G --> H[Build Docker Image]
    H --> I[Push to Registry]
    I --> J[Deploy to Staging]
    J --> K[E2E Tests]
    K --> L{Manual Approval}
    L -->|Approved| M[Deploy to Production]
    L -->|Rejected| N[Stop Pipeline]
    M --> O[Health Checks]
    O --> P[Monitor & Alert]
    
    style D fill:#2196f3
    style E fill:#2196f3
    style F fill:#2196f3
    style G fill:#ff9800
    style K fill:#ffeb3b
    style M fill:#4caf50
    style N fill:#f44336
```

## Microservices Communication

```mermaid
sequenceDiagram
    participant Client
    participant Gateway
    participant AuthService
    participant UserService
    participant ProductService
    participant Database
    
    Client->>Gateway: Request with JWT
    Gateway->>AuthService: Validate Token
    AuthService-->>Gateway: Token Valid
    Gateway->>UserService: Get User Profile
    UserService->>Database: Query User Data
    Database-->>UserService: User Data
    UserService-->>Gateway: User Profile
    Gateway->>ProductService: Get User Products
    ProductService->>Database: Query Products
    Database-->>ProductService: Product Data
    ProductService-->>Gateway: Products
    Gateway-->>Client: Combined Response
```

## Infrastructure Architecture

```mermaid
graph TB
    subgraph "Load Balancer"
        LB[Nginx Load Balancer]
    end
    
    subgraph "Kubernetes Cluster"
        subgraph "Frontend Pods"
            FE1[React App Pod 1]
            FE2[React App Pod 2]
        end
        
        subgraph "Backend Pods"
            BE1[Node.js API Pod 1]
            BE2[Node.js API Pod 2]
            BE3[Node.js API Pod 3]
        end
        
        subgraph "Database Pods"
            DB1[PostgreSQL Primary]
            DB2[PostgreSQL Replica]
        end
        
        subgraph "Cache Layer"
            REDIS[Redis Cluster]
        end
    end
    
    subgraph "External Services"
        S3[AWS S3]
        MONITORING[Prometheus/Grafana]
        LOGS[ELK Stack]
    end
    
    LB --> FE1
    LB --> FE2
    FE1 --> BE1
    FE2 --> BE2
    BE1 --> DB1
    BE2 --> DB1
    BE3 --> DB2
    BE1 --> REDIS
    BE2 --> REDIS
    BE3 --> REDIS
    BE1 --> S3
    BE2 --> S3
    BE3 --> S3
    
    style LB fill:#e1f5fe
    style DB1 fill:#fff3e0
    style REDIS fill:#ffebee
```

## Security Architecture

```mermaid
graph TD
    A[External Traffic] --> B[WAF - Web Application Firewall]
    B --> C[Load Balancer with SSL]
    C --> D[API Gateway]
    D --> E[Authentication Service]
    E --> F[JWT Token Validation]
    F --> G[Rate Limiting]
    G --> H[Backend Services]
    H --> I[Database with Encryption]
    
    J[Security Scanning] --> K[SAST - Static Analysis]
    J --> L[DAST - Dynamic Analysis]
    J --> M[Dependency Scanning]
    J --> N[Container Scanning]
    
    style B fill:#ff5722
    style E fill:#ff9800
    style F fill:#ffc107
    style I fill:#4caf50
```

## Monitoring and Observability

```mermaid
graph TD
    A[Application] --> B[Metrics Collection]
    A --> C[Log Aggregation]
    A --> D[Distributed Tracing]
    
    B --> E[Prometheus]
    C --> F[ELK Stack]
    D --> G[Jaeger]
    
    E --> H[Grafana Dashboard]
    F --> I[Kibana Dashboard]
    G --> J[Jaeger UI]
    
    H --> K[Alerting - PagerDuty]
    I --> K
    J --> K
    
    K --> L[On-Call Engineer]
    
    style E fill:#ff5722
    style F fill:#2196f3
    style G fill:#9c27b0
    style K fill:#f44336
```