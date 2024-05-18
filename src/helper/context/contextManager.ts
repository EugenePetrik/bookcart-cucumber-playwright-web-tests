class ContextManager {
  // eslint-disable-next-line no-use-before-define
  private static instance: ContextManager;

  private state: { [key: string]: unknown };

  private constructor() {
    this.state = {};
  }

  public static getInstance(): ContextManager {
    if (!ContextManager.instance) {
      ContextManager.instance = new ContextManager();
    }
    return ContextManager.instance;
  }

  public set(key: string, value: unknown): void {
    this.state[key] = value;
  }

  public get(key: string): unknown {
    return this.state[key];
  }

  public clear(): void {
    this.state = {};
  }
}

export default ContextManager.getInstance();
