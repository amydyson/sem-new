import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  // User Profile (separate from Auth0 user)
  UserProfile: a
    .model({
      userId: a.string().required(), // Auth0 user ID
      name: a.string(),
      email: a.string(),
      age: a.integer(),
      gender: a.enum(['Masculino', 'Feminino']),
      weight: a.float(),
      height: a.float(),
      bmi: a.float(),
      isSmoker: a.boolean().default(false),
      exerciseFrequency: a.integer().default(0),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .authorization((allow) => [
      allow.owner(), // Only the owner can access their profile
      allow.authenticated().to(['read']), // Authenticated users can read
    ]),

  // Blood Pressure Readings
  BloodPressureReading: a
    .model({
      userId: a.string().required(),
      systolic: a.integer().required(),
      diastolic: a.integer().required(),
      pulse: a.integer(),
      recordedAt: a.datetime().required(),
      notes: a.string(),
      location: a.string(), // home, clinic, etc.
    })
    .authorization((allow) => [
      allow.owner(),
      allow.authenticated().to(['read']),
    ]),

  // Medications
  Medication: a
    .model({
      userId: a.string().required(),
      name: a.string().required(),
      dosage: a.string(),
      frequency: a.string(),
      startDate: a.date(),
      endDate: a.date(),
      isActive: a.boolean().default(true),
      sideEffects: a.string(),
      prescribedBy: a.string(),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.authenticated().to(['read']),
    ]),

  // Game Progress/Scores
  GameScore: a
    .model({
      userId: a.string().required(),
      gameType: a.enum(['BloodPressureMaze', 'HealthQuiz']),
      score: a.integer().required(),
      level: a.integer().default(1),
      completedAt: a.datetime().required(),
      timeSpent: a.integer(), // in seconds
      itemsCollected: a.integer().default(0),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.authenticated().to(['read']),
    ]),

  // Health Tips/Articles
  HealthTip: a
    .model({
      title: a.string().required(),
      content: a.string().required(),
      category: a.enum(['Diet', 'Exercise', 'Medication', 'Lifestyle']),
      targetAudience: a.enum(['Patient', 'Professional', 'Both']),
      isPublished: a.boolean().default(false),
      createdBy: a.string(),
      publishedAt: a.datetime(),
    })
    .authorization((allow) => [
      allow.authenticated().to(['read']),
      allow.group('admins').to(['create', 'read', 'update', 'delete']),
    ]),

  // Appointments (for future use)
  Appointment: a
    .model({
      patientId: a.string().required(),
      doctorId: a.string(),
      scheduledAt: a.datetime().required(),
      duration: a.integer().default(30), // minutes
      type: a.enum(['Consultation', 'Checkup', 'Follow-up']),
      status: a.enum(['Scheduled', 'Completed', 'Cancelled']),
      notes: a.string(),
      bloodPressureReading: a.string(), // JSON string
    })
    .authorization((allow) => [
      allow.owner(),
      allow.authenticated().to(['read']),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'iam', // Since we're not using Cognito
  },
});