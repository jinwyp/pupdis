import got from 'got';
import { setTimeout } from 'timers/promises';








class Solver {
    constructor(clientKey, options = {}) {
        this._apikey = clientKey;
        this._delay = options.delay || 5;
        this._debug = options.debug || false;
        this._baseUrl = options.baseUrl || 'https://api.yescaptcha.com';
    }


    async getTaskResult(taskId) {

        await setTimeout(this._delay * 1000, 'result');

        let urlGetTaskResult = `${this._baseUrl}/getTaskResult`;

        let data2 = {
            clientKey: this._apikey,
            taskId: taskId
        }

        let response2 = await got.post(urlGetTaskResult, { json: data2 }).json();

        if (this._debug) {
            console.log()
            console.log("----- Debug Http Post Body: ");
            console.log(data2);
            console.log("----- Debug Http Response: ");
            console.log(response2);
            console.log("----- Debug Http Response End -----");
            console.log()
        }

        if (response2.errorId === 0) {
            if (this._debug) {
                console.log(`getTaskResult solution: ${response2.solution}`)
            }

            if (response2.status === "ready") {
                return response2.solution;

            } else if (response2.status === "processing") {

                return this.getTaskResult(taskId);
            } else {

                throw new Error(response2);
            }

        } else {
            throw new Error(response2);
        }
    }


    async imageToText(imageBase64) {
        // https://api.yescaptcha.com/createTask
        let urlCreateTask = `${this._baseUrl}/createTask`;

        let data = {
            clientKey: this._apikey,
            task: {
                "type": "ImageToTextTask",
                "body": imageBase64
            }
        }

        let response = await got.post(urlCreateTask, { json: data }).json();

        if (this._debug) {
            console.log()
            console.log("----- Debug Http Post Body: ");
            console.log(data);
            console.log("----- Debug Http Response: ");
            console.log(response);
            console.log("----- Debug Http Response End -----");
            console.log()
        }

        if (response.errorId === 0) {
            if (this._debug) {
                console.log(`createTask taskId: ${response.taskId}`)
            }
            // 25561bc6-70a7-11ed-afe4-62e5562e2359
            return this.getTaskResult(response.taskId);
        } else {
            throw new Error(response);
        }

    }


}

export default Solver;