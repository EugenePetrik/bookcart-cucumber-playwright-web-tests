class ContextManager {
  private static instance: ContextManager;
  private state: { [key: string]: any };

  private constructor() {
    this.state = {};
  }

  public static getInstance(): ContextManager {
    if (!ContextManager.instance) {
      ContextManager.instance = new ContextManager();
    }
    return ContextManager.instance;
  }

  public set(key: string, value: any): void {
    this.state[key] = value;
  }

  public get(key: string): any {
    return this.state[key];
  }

  public clear(): void {
    this.state = {};
  }
}

export default ContextManager.getInstance();
