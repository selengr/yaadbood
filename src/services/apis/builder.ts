import { IApiResponseCombo } from './../../@types/api_response';
import { FuneralModel, IAudioContent, IContentModel, IRoomTypeEnum } from '@/@types/event_maker';
import { callApi } from '../config/configAxios';
import { IApiResponseWithPagination } from '@/@types/api_response';


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

export function callApiMediaList() {
  return callApi.get<IApiResponseWithPagination<IAudioContent[]>>('/media?searchFilterModel=%7B%22searchFilterBoxList%22%3A%5B%7B%22restrictionList%22%3A%5B%5D%7D%5D%2C%22sortList%22%3A%5B%7B%22fieldName%22%3A%22id%22%2C%22type%22%3A%22DSC%22%7D%5D%2C%22page%22%3A0%2C%22rows%22%3A10%7D');
}

export function callApiContentModel() {
  return callApi.get<IApiResponseWithPagination<IContentModel[]>>('/ability?searchFilterModel=%7B%22searchFilterBoxList%22%3A%5B%7B%22restrictionList%22%3A%5B%5D%7D%5D%2C%22sortList%22%3A%5B%7B%22fieldName%22%3A%22id%22%2C%22type%22%3A%22DSC%22%7D%5D%2C%22page%22%3A0%2C%22rows%22%3A10%7D');
}

export function callApiCreateRoom(data:FuneralModel) {
  return callApi.post('/back-panel/room/create',data);
}

export function callApiRoomType() {
  return callApi.get<IApiResponseCombo<IRoomTypeEnum[]>>('/back-panel/room/room-type/custom-combo?customComboFilterModel=%7B%22type%22%3A%20%22COMBO%22%2C%22entity%22%3A%20%22PROJECTS%22%2C%22input%22%3A%20%22%22%2C%22page%22%3A%200%2C%22rows%22%3A%201000%7D');
}
