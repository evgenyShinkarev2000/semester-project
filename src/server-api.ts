import axios, { Axios, RawAxiosRequestConfig } from "axios";

export default class ServerApi
{
  public readonly basePath: string = process.env.ServerPath!;
  private readonly _axios: Axios;

  public constructor(){
    this._axios = axios.create({baseURL: this.basePath});
  }

  public getFileNames(directoryId: string): Promise<string[]>
  {
    return this.getHelper(null, "Files", directoryId);
  }

  private getHelper<T>(config?: RawAxiosRequestConfig<any> | undefined | null, ...tokens: string[]): Promise<T>
  {
    return this.requestHelper<T>(this._axios.get, tokens, config ?? undefined);
  }

  private requestHelper<T>(requestMethod: (url: string, config?: RawAxiosRequestConfig<any> | undefined) => Promise<T>,
    tokens: string[],
    config?: RawAxiosRequestConfig<any> | undefined
    ): Promise<T>
  {
    return requestMethod.call(this._axios, this.basePath + tokens.join("\\"), config);
  }
}