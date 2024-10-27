import axios from "axios";
import * as Toastr from "toastr";
import { clearToken, getHeaderDetail } from "./utility";
import Swal from "sweetalert2";

export default class HttpHelper {
    static httpRequest = async (url, methodType, headers, body) => {
        headers = getHeaderDetail(headers);

        let config = {
            method: methodType,
            url: url,
            headers: headers,
            data: body,
            raxConfig: {
                retry: 3,
                noResponseRetries: 2,
                retryDelay: 100,
                httpMethodsToRetry: ["GET", "HEAD", "OPTIONS", "DELETE", "PUT"],
                statusCodesToRetry: [
                    [100, 199],
                    [429, 429],
                    [500, 599],
                ],
            },
        };

        return await axios(config)
            .then(function (response) {
                return HttpHelper.successHandler(response);
            })
            .catch(function (error) {
                HttpHelper.errorHandler(error);
            });
    };

    static successHandler = (response) => {
        if (response.status === 200 || response.status === 201) {
            return response.data;
        } else {
            Toastr.error("Something Went Wrong");
        }
    };

    static errorHandler = (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 400:
                    let message = error.response.data.message;
                    if (!message) {
                        message = error.response.data;
                    }

                    Swal.fire({
                        title: "Validation",
                        text: message,
                        icon: "error",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        showConfirmButton: false,
                        cancelButtonText: "Close",
                        customClass: {
                            cancelButton: "order-1 right-gap",
                            confirmButton: "order-2",
                            denyButton: "order-3",
                        },
                    });
                    break;
                case 401:
                    Swal.fire({
                        title: "Authorization",
                        text: "Session Expired, Please login again",
                        icon: "error",
                        showCancelButton: false,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        showConfirmButton: true,
                        cancelButtonText: "Close",
                        customClass: {
                            cancelButton: "order-1 right-gap",
                            confirmButton: "order-2",
                            denyButton: "order-3",
                        },
                    }).then((x) => {
                        if (x.isConfirmed) {
                            clearToken();
                            document.location.href = "/login";
                        }
                    })
                    break;
                case 404:
                    Toastr.error(
                        "Requested resource does not exist",
                        "Not Found"
                    );
                    break;
                case 409:
                    Toastr.error("Version control conflit", "Conflict");
                    break;
                case 500:
                    Toastr.error("Internal server error", "Error");
                    break;
                default:
                    break;
            }
        }
        throw error;
    };
}
