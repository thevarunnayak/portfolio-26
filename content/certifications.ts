import { CertificationItem } from '@/types';

export const certificationsData: CertificationItem[] = [
  {
    id: 'google-ai-pro',
    title: 'Google AI Professional Certificate',
    issuer: 'Google',
    issueDate: '2025',
    credentialId: 'GOOG-AI-994821',
    verifyUrl: 'https://coursera.org/verify/professional-cert/google-ai',
    summary: 'Comprehensive certification in applied artificial intelligence, machine learning pipelines, prompt engineering, generative AI model integration, and ethical AI deployment.',
    modules: [
      {
        name: 'Foundations of AI & Machine Learning',
        skillsLearned: ['Neural Network Architectures', 'Supervised & Unsupervised Learning', 'Model Evaluation Metrics']
      },
      {
        name: 'Generative AI & LLM Systems Integration',
        skillsLearned: ['Prompt Optimization', 'RAG (Retrieval-Augmented Generation)', 'Vector Embeddings']
      },
      {
        name: 'Responsible & Ethical AI Engineering',
        skillsLearned: ['Bias Audit Pipelines', 'Model Interpretability', 'Data Privacy Frameworks']
      }
    ]
  },
  {
    id: 'react-dev-pro',
    title: 'Become a Professional React Developer',
    issuer: 'Meta / Coursera',
    issueDate: '2024',
    credentialId: 'META-REACT-773019',
    verifyUrl: 'https://coursera.org/verify/professional-cert/meta-react',
    summary: 'Advanced mastery of React architecture, custom hooks performance optimization, state management patterns, automated testing suites, and production web deployment.',
    modules: [
      {
        name: 'Advanced React State & Architecture',
        skillsLearned: ['Context API Optimization', 'Reducer State Machines', 'Compound Component Patterns']
      },
      {
        name: 'React Native & Mobile Systems',
        skillsLearned: ['Native Bridge Interop', 'Device Hardware APIs', 'Navigation Stacks']
      },
      {
        name: 'Performance Profiling & Testing',
        skillsLearned: ['React Profiler flamegraphs', 'Jest & React Testing Library', 'End-to-End Cypress Integration']
      }
    ]
  },
  {
    id: 'ibm-sql-ds',
    title: 'IBM SQL for Data Science',
    issuer: 'IBM',
    issueDate: '2024',
    credentialId: 'IBM-SQL-338192',
    verifyUrl: 'https://coursera.org/verify/specialization/ibm-sql',
    summary: 'Specialized credentials in enterprise database querying, relational schema normalization, complex SQL joins, index optimization, and Python DB-API connectivity.',
    modules: [
      {
        name: 'Relational Database Architecture',
        skillsLearned: ['Schema Normalization (3NF)', 'Foreign Key Constraints', 'Index Optimization Strategy']
      },
      {
        name: 'Advanced SQL Querying & Aggregations',
        skillsLearned: ['Window Functions', 'Subqueries & CTEs', 'Transaction ACID Compliance']
      }
    ]
  }
];
