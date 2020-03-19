import config from "@/buisness/config/request";
import axios from "axios";
import store from "@/buisness/store/index";
import * as _ from "lodash";
import objectToFormData from "object-to-formdata";

class Request {
  static readonly OK = 200;
  static readonly CREATED = 201;
  static readonly DELETED = 204;
  static readonly BAD_REQUEST = 400;
  static readonly UNAUTHORIZED = 401;
  static readonly FORBIDDEN = 403;
  static readonly NOT_FOUND = 404;
  static readonly VALIDATION_FAILED = 422;
  static readonly INTERNAL_SERVER_ERROR = 500;
  static readonly SERVICE_UNAVAILABLE = 503;

  static readonly POST_METHOD = "POST";
  static readonly GET_METHOD = "GET";
  static readonly PUT_METHOD = "PUT";
  static readonly DELETE_METHOD = "DELETE";

  public post(
    url: string,
    params: any = null,
    crossDomain = true
  ): Promise<any> {
    // @ts-ignore
    const data = objectToFormData(params);

    return this.send(url, Request.POST_METHOD, { data: data }, crossDomain);
  }

  public get(
    url: string,
    params: any = null,
    crossDomain = true
  ): Promise<any> {
    return this.send(url, Request.GET_METHOD, { params: params }, crossDomain);
  }

  public put(
    url: string,
    params: any = null,
    crossDomain = true
  ): Promise<any> {
    return this.send(url, Request.PUT_METHOD, { data: params }, crossDomain);
  }

  public delete(
    url: string,
    params: any = null,
    crossDomain = true
  ): Promise<any> {
    return this.send(url, Request.DELETE_METHOD, { data: params }, crossDomain);
  }

  private send(
    url: string,
    method: string,
    params: Record<string, any> | null,
    crossDomain: boolean
  ): Promise<any> {
    return new Promise<void>((result, reject?) => {
      const path = crossDomain
        ? `${config.protocol}://${config.domain}/v${config.version}/${url}`
        : `${config.protocol}://${config.site}/${url}`;

      let requestConfig = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "Authorization",
          "X-Requested-With": "XMLHttpRequest",
          Authorization: `Bearer ${store.getters.getClientToken}`
        },
        url: path,
        responseType: "json",
        method: method
      };

      if (params) {
        requestConfig = _.merge(requestConfig, params);
      }

      // @ts-ignore
      axios(requestConfig)
        .then((response: any) => {
          const success_status = [Request.OK, Request.CREATED, Request.DELETED];

          if (success_status.some(code => response.status === code)) {
            result(response.data);
            return;
          }

          reject(response.data);
        })
        .then((response: any) => {
          reject(response.data);
        })
        .catch((response: any) => {
          const status = _.get(response, "response.status");
          if (status && status === Request.UNAUTHORIZED) {
            reject({
              code: status,
              message: "Авторизуйся і спробуйте ще раз."
            });
          }

          let message = _.get(response, "response.message");

          if (_.isUndefined(message)) {
            message = _.get(response, "response.data.message");
          }

          if (_.isUndefined(message)) {
            message = _.get(response, "response.data[0].message");
          }

          if (_.isUndefined(message)) {
            message = "Виникла помилка. Повторіть спробу пізніше.";
          }

          reject({ code: status, message: message });
        });
    });
  }
}

export default new Request();
