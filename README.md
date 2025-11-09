# Catalyze Web Application

## 🐱 Smart Litter Box with Fecal Screening (Not Diagnosis)

**Catalyze** is an automatic cleaning litter box system with integrated machine vision for **fecal screening** that helps cat owners monitor their pet's digestive health patterns and share valuable data with veterinarians.

### ⚠️ Important: Screening, Not Diagnosis

This system performs **visual screening and pattern monitoring only**. It does NOT provide medical diagnoses, suggest treatments, or replace veterinary care. All visual observations should be discussed with a licensed veterinarian.

---

## 🎯 Project Overview

### What We're Building

A **full-stack web application** hosted on AWS that:
- Connects to a Raspberry Pi-powered smart litter box
- Captures and analyzes fecal samples using ML (YOLOv8)
- Tracks bathroom events and patterns over time
- Alerts users to visual changes (not diagnoses)
- Generates reports for veterinarians
- Provides device management and maintenance tracking

### Core Features

#### 🏠 Home/Dashboard
- Today's event summary
- Health pattern alerts (with disclaimers)
- Quick device stats
- Multi-cat overview
- Quick actions (manual clean, add note)

#### 📊 Health Tracking
- Event log with timestamps and pagination
- Visual screening results (color, consistency, size, shape)
- Detected anomalies tracking
- Image gallery with horizontal scrolling
- Manual notes with categories
- Event filtering and sorting
- Real-time updates

#### 🔧 Device Management
- Real-time litter box status monitoring
- Manual cleaning controls with safety checks
- Automated cleaning schedules (day/time based)
- Cleaning history tracking
- Waste and litter level indicators
- Connection status and firmware version
- Multi-device support
- Live status updates via WebSocket

#### 📋 Veterinary Report Generation
- PDF and HTML report formats
- Customizable date ranges and filters
- Health trend analysis and charts
- Event summaries with images
- Share reports via email
- Export to device storage
- Professional formatting with disclaimers

#### ⚙️ Settings & Profile Management
- User profile with photo upload
- Email and password management
- Cat profile CRUD operations (multi-cat support)
- Notification preferences
- Privacy and data sharing controls
- Theme preferences (light/dark/auto)
- Veterinary contact management
- Account statistics and data export

---

## 🛠️ Technology Stack

### Frontend (Web App)
- **Framework**: Custom TypeScript framework with Webpack
- **Language**: TypeScript 5.x
- **Build Tool**: Webpack 5
- **Styling**: CSS3 with custom design system
- **HTTP Client**: Fetch API / Axios
- **Real-time**: WebSocket for live updates
- **Testing**: Jest + Testing Library

### Backend (AWS Lambda + API Gateway)
- **Runtime**: Node.js 18+ (AWS Lambda)
- **Language**: TypeScript 5.x
- **API**: AWS API Gateway (REST + WebSocket)
- **Authentication**: AWS Cognito + JWT
- **Functions**: AWS Lambda (serverless)
- **Storage**: Amazon S3 (images/reports)
- **Real-time**: API Gateway WebSocket
- **Testing**: Jest + AWS SAM Local

### Database
- **Primary**: Amazon RDS (PostgreSQL 14+)
- **Cache**: Amazon ElastiCache (Redis)
- **NoSQL**: Amazon DynamoDB (device telemetry)
- **Schema**: User, Cat, Device, HealthEvent, ScreeningResult, EventNote, CleaningCycle, Notification, UserSettings, VeterinarianContact, VetReport

### Infrastructure (AWS CDK)
- **IaC Tool**: AWS CDK (TypeScript)
- **Compute**: Lambda Functions
- **API**: API Gateway (REST + WebSocket)
- **Auth**: Cognito User Pools
- **Database**: RDS PostgreSQL
- **Cache**: ElastiCache Redis
- **Storage**: S3 Buckets
- **CDN**: CloudFront
- **Monitoring**: CloudWatch
- **Secrets**: Secrets Manager
- **Deployment**: CodePipeline + CodeBuild

### Edge Device (Raspberry Pi)
- **Language**: Python 3.9+
- **ML Framework**: YOLOv8 (Ultralytics)
- **Image Processing**: OpenCV
- **Communication**: MQTT (AWS IoT Core) or WebSocket
- **Updates**: AWS IoT Device Management

---

## 🏗️ Architecture

```
[Web App] ←→ [CloudFront] ←→ [API Gateway] ←→ [Lambda Functions] ←→ [RDS PostgreSQL]
    ↓              ↓                ↓                  ↓                      ↓
[S3 Static]   [WAF]        [Cognito Auth]      [ElastiCache]          [DynamoDB]
                                                      ↓                      ↓
                                              [IoT Core] ←→ [Raspberry Pi Device]
                                                                        ↓
                                                                  [YOLOv8 ML]
                                                                  [Camera/Sensors]
```

**Key AWS Services:**
- **Frontend Hosting**: S3 + CloudFront
- **API Layer**: API Gateway + Lambda
- **Authentication**: Cognito User Pools
- **Database**: RDS PostgreSQL + DynamoDB
- **Caching**: ElastiCache Redis
- **Storage**: S3 (images, reports)
- **IoT**: AWS IoT Core (device communication)
- **Monitoring**: CloudWatch + X-Ray
- **CI/CD**: CodePipeline + CodeBuild

---

## 📁 Project Structure

```
catalyze-web-app
├── frontend/                 # Web application frontend
│   ├── src/                 # Source files
│   │   ├── app.ts          # Main application
│   │   ├── main.ts         # Entry point
│   │   ├── router.ts       # Client-side routing
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── theme/          # Design system
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   ├── package.json        # Frontend dependencies
│   ├── tsconfig.json       # TypeScript config
│   └── webpack.config.js   # Webpack configuration
│
├── backend/                 # Lambda functions
│   ├── src/
│   │   ├── handlers/       # Lambda function handlers
│   │   │   ├── auth/       # Authentication handlers
│   │   │   ├── events/     # Health event handlers
│   │   │   ├── devices/    # Device management
│   │   │   └── reports/    # Report generation
│   │   ├── services/       # Business logic
│   │   ├── models/         # Data models
│   │   └── utils/          # Shared utilities
│   ├── package.json        # Backend dependencies
│   └── tsconfig.json       # TypeScript config
│
├── infrastructure/          # AWS CDK infrastructure
│   ├── lib/
│   │   ├── catalyze-stack.ts      # Main CDK stack
│   │   ├── frontend-stack.ts      # S3 + CloudFront
│   │   ├── api-stack.ts           # API Gateway + Lambda
│   │   ├── database-stack.ts      # RDS + DynamoDB
│   │   ├── auth-stack.ts          # Cognito
│   │   ├── storage-stack.ts       # S3 buckets
│   │   └── iot-stack.ts           # IoT Core
│   ├── bin/
│   │   └── catalyze-app.ts        # CDK app entry
│   ├── cdk.json            # CDK configuration
│   ├── package.json        # Infrastructure dependencies
│   └── tsconfig.json       # TypeScript config
│
└── README.md               # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **AWS CLI** configured with credentials
- **AWS CDK** (`npm install -g aws-cdk`)
- **Git**
- **AWS Account** with appropriate permissions

### Quick Start

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd catalyze-web-app
```

#### 2. Install Dependencies

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install

# Infrastructure
cd ../infrastructure
npm install
```

#### 3. Configure AWS Credentials

```bash
aws configure
# Enter your AWS Access Key ID, Secret Access Key, and region
```

#### 4. Deploy Infrastructure (First Time)

```bash
cd infrastructure

# Bootstrap CDK (only needed once per AWS account/region)
cdk bootstrap

# Deploy all stacks
npm run deploy
# or
cdk deploy --all

# Note the output values (API endpoint, Cognito User Pool ID, etc.)
```

#### 5. Configure Frontend Environment

Create `frontend/src/config/environment.ts`:

```typescript
export const environment = {
  apiEndpoint: 'https://your-api-id.execute-api.us-east-1.amazonaws.com/prod',
  cognitoUserPoolId: 'us-east-1_xxxxxxxxx',
  cognitoClientId: 'xxxxxxxxxxxxxxxxxxxxxxxxxx',
  region: 'us-east-1',
  websocketEndpoint: 'wss://your-websocket-id.execute-api.us-east-1.amazonaws.com/prod'
};
```

#### 6. Run Frontend Locally

```bash
cd frontend
npm start
# Opens http://localhost:8080
```

#### 7. Test Lambda Functions Locally (Optional)

```bash
cd backend
npm run test
# or test with SAM Local
sam local start-api
```

---

## 🔧 Development Workflow

### Frontend Development

```bash
cd frontend
npm start          # Start dev server (localhost:8080)
npm run build      # Production build
npm test           # Run tests
npm run lint       # Check code quality
```

### Backend Development

```bash
cd backend
npm run build      # Compile TypeScript
npm test           # Run unit tests
npm run test:integration  # Integration tests with AWS
```

### Infrastructure Updates

```bash
cd infrastructure
cdk diff           # Preview changes
cdk deploy         # Deploy changes
cdk destroy        # Tear down resources (careful!)
```

---

## 🧪 Testing

### Frontend Tests
```bash
cd frontend
npm test                # Unit tests
npm run test:e2e        # End-to-end tests
npm run test:coverage   # Coverage report
```

### Backend Tests
```bash
cd backend
npm test                # Unit + integration tests
npm run test:unit       # Unit tests only
npm run test:coverage   # Coverage report
```

### Infrastructure Tests
```bash
cd infrastructure
npm test                # CDK construct tests
```

---

## 🔐 Security & Privacy

- **Encryption**: TLS 1.3 (in transit), AES-256 (at rest via AWS KMS)
- **Authentication**: AWS Cognito + JWT tokens
- **Authorization**: IAM roles and policies
- **Access Control**: Role-based (Owner, Family, Vet)
- **Compliance**: GDPR, CCPA ready
- **Data Protection**: User data export/deletion on request
- **Image Privacy**: S3 with presigned URLs, time-limited access
- **API Security**: AWS WAF, rate limiting, API keys
- **Secrets Management**: AWS Secrets Manager
- **Monitoring**: CloudWatch + CloudTrail audit logs

---

## 📊 AWS Services Used

| Service | Purpose |
|---------|---------|
| **S3** | Frontend hosting, image storage, report storage |
| **CloudFront** | CDN for fast global delivery |
| **API Gateway** | REST API + WebSocket endpoints |
| **Lambda** | Serverless compute for all backend logic |
| **Cognito** | User authentication and management |
| **RDS PostgreSQL** | Primary relational database |
| **DynamoDB** | Device telemetry and real-time data |
| **ElastiCache Redis** | Session caching, API response caching |
| **IoT Core** | Device connectivity (Raspberry Pi) |
| **CloudWatch** | Logging, monitoring, alarms |
| **Secrets Manager** | API keys, database credentials |
| **CodePipeline** | CI/CD automation |
| **CodeBuild** | Build and test automation |
| **WAF** | Web application firewall |
| **X-Ray** | Distributed tracing |

---

## 💰 Estimated AWS Costs

**Development (Low Traffic):**
- API Gateway: $0-5/month
- Lambda: Free tier / $0-10/month
- RDS (t3.micro): $15-20/month
- ElastiCache (t3.micro): $12-15/month
- S3 + CloudFront: $1-5/month
- **Total**: ~$30-60/month

**Production (1000 users):**
- API Gateway: $20-50/month
- Lambda: $50-100/month
- RDS (t3.small): $30-40/month
- ElastiCache (t3.small): $25-35/month
- S3 + CloudFront: $10-30/month
- IoT Core: $5-15/month
- **Total**: ~$140-270/month

*Use AWS Cost Explorer and set up billing alarms!*

---

## ⚠️ Medical Disclaimer

**IMPORTANT**: This system provides visual screening and pattern monitoring to assist pet owners in tracking their cat's digestive health. **This system does NOT provide medical diagnoses.** All visual observations and pattern alerts should be discussed with a licensed veterinarian. If you notice concerning changes in your cat's health, contact your veterinarian immediately.

---

## 📊 Development Roadmap

### 🚧 Phase 1: Infrastructure Setup (Current)
- [ ] AWS CDK stack definitions
- [ ] S3 + CloudFront for frontend
- [ ] API Gateway + Lambda setup
- [ ] Cognito authentication
- [ ] RDS PostgreSQL database
- [ ] DynamoDB for telemetry
- [ ] ElastiCache Redis
- [ ] IoT Core for devices

### 📋 Phase 2: Core Backend (Planned)
- [ ] User authentication APIs
- [ ] Cat profile management
- [ ] Device registration and management
- [ ] Health event logging
- [ ] Image upload to S3
- [ ] WebSocket for real-time updates
- [ ] Database schema and migrations

### 📋 Phase 3: Frontend Development (Planned)
- [ ] Authentication UI (login, register)
- [ ] Dashboard with event summary
- [ ] Health tracking page
- [ ] Device management interface
- [ ] Settings and profile pages
- [ ] Report generation UI
- [ ] Responsive design

### 📋 Phase 4: Advanced Features (Planned)
- [ ] Veterinary report generation (PDF)
- [ ] Multi-cat support
- [ ] Cleaning schedule automation
- [ ] Notification system
- [ ] Analytics and charts
- [ ] Export functionality

### 📋 Phase 5: Hardware Integration (Planned)
- [ ] Raspberry Pi setup
- [ ] YOLOv8 model deployment
- [ ] AWS IoT Core integration
- [ ] Camera integration
- [ ] Sensor calibration
- [ ] Real device testing

### 📋 Phase 6: Testing & Launch (Planned)
- [ ] Unit and integration tests
- [ ] End-to-end testing
- [ ] Performance optimization
- [ ] Security audit
- [ ] Beta user testing
- [ ] Production deployment

---

## 👥 Team

**Polytechnic University of the Philippines**  
Bachelor of Science in Computer Engineering

- **BITHAO, DANIEL D.**
- **LORZANO, LORENZO JAIMES C.**
- **MADRIAGA, BRYLE R.**
- **NAVAL, JAN FRANCIS H.**

**Thesis**: Catalyze: An Automatic Cleaning Litter Box for Cat's Digestive Health Monitoring with Integrated Machine Vision for Fecal Screening

**Target Completion**: June 2025

---

## 📞 Support & Resources

- **AWS Documentation**: [AWS CDK Docs](https://docs.aws.amazon.com/cdk/)
- **TypeScript**: [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- **Project Issues**: GitHub Issues (coming soon)
- **Team Email**: [To be added]

---

## 🙏 Acknowledgments

- Polytechnic University of the Philippines
- Faculty of Computer Engineering
- Pet owners who provided feedback
- Veterinarians who consulted on the project
- AWS for cloud infrastructure

---

## 📄 License

[To be determined]

---

**Last Updated**: November 9, 2025  
**Version**: 0.1 (Initial Setup - Infrastructure Phase)  
**Status**: 🚧 In Development - AWS Infrastructure Setup