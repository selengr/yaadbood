import { callApi } from '../config/configAxios';


interface ITestApi {
  data: any;
}

export type IChangeOrMovePositionApi = {
  formBuilderId: number;
  questionId: number;
  questionGroupId: number;
  targetQuestionGroupId: number | null;
  newPosition: number;
};

export function textApi() {
  return callApi.get<ITestApi>('/test');
}

export function callApiForm(id: string) {
  return callApi.get<any>('/form/' + id);
}
