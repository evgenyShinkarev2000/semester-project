import axios, { Axios, AxiosResponse, RawAxiosRequestConfig } from "axios";

export default class ServerApi
{
  public readonly basePath: string = process.env.REACT_APP_SERVER_PATH!;
  private readonly _axios: Axios;

  public constructor()
  {
    this._axios = axios.create({ baseURL: this.basePath });
  }

  public getFileNames(directoryId: string): Promise<string[]>
  {
    return this._axios.get(this.buildRoute("Files", directoryId)).then(axiosResponse => axiosResponse.data);
  }

  public postFiles(files: FileList): Promise<string>
  {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++)
    {
      const file = files[i]
      formData.append("formFiles", file); //не менять название formFiles, нужно для корректной работы asp
    }
    
    return this._axios.post(this.buildRoute("Files"), formData)
      .then(axiosResponse => axiosResponse.data);
  }

  public buildDownloadLink(directoryId: string): string{
    return this.buildRoute("Archives", directoryId);
  }


  private buildRoute(...tokens: string[]): string
  {
    return this.basePath + tokens.join("\\");
  }
}