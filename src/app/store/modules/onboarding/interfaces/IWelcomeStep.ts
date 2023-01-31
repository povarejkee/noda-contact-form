import {
  EnWelcomeStepStatus,
  EnWelcomeStepValue,
} from '../enums/onboarding.enums';

export interface IWelcomeStep {
  status: EnWelcomeStepStatus;
  description: string;
  name: string;
  value: EnWelcomeStepValue;
}
