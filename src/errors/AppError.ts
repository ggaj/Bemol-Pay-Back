import { ErrosResponse } from '../interface/errosResponse'

class AppError {
  public readonly erro: string;
  public readonly statusCode: number;
  public readonly errors: ErrosResponse[];

  constructor(erro: string, statusCode = 400, errors: ErrosResponse[] = []) {
    this.erro = erro;
    this.statusCode = statusCode;
    this.errors = errors
  }
}

export default AppError;
