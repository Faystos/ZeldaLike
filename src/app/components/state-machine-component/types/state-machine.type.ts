import { StateMachineComponent } from '../state-machine-component';

export interface StateMachine {
  stateMachine: StateMachineComponent;
  name: string;
  onEnter?: (args: unknown[]) => void;
  onUpdate?: () => void;
}
