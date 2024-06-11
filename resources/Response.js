const fs = require('fs');
const File = require('./File');
class Response {
    SERVER_SETTINGS;
    CONFIGURATION_LIST;
    HEADERS = [];

    constructor() {
        this.CONFIGURATION_LIST = {
            APP_URL: process.env.APP_URL,
            APP_PORT: process.env.APP_PORT
        }
        this.SERVER_SETTINGS = this.CONFIGURATION_LIST['APP_URL'] + ":" + this.CONFIGURATION_LIST['APP_PORT'];
    }

    static error(res, status, error = null) {
        let data = {
            'title': 'Page of Error'
        }

        if (typeof error == 'string')
            data = Object.assign(data, { 'error_message': error })
        else if (typeof error.message !== 'undefined')
            data = Object.assign(data, { 'error_message': error.message })

        if (typeof error.stack !== 'undefined')
            data = Object.assign(data, { 'error_message': error.stack })

        const object = {
            'object': (data, status) => {
                if (this.listConfigurations.APP_DEBUG)
                    ((new Response()).view('error', status ?? 404, data)).renderResponse(res);
                else
                    ((new Response()).view('error', status ?? 404, data)).renderResponse(res);
                return true;
            },
            'string': (data, status) => {
                ((new Response()).view('error', status ?? 404, data)).renderResponse(res);
                return true;
            }
        }

        if (object[typeof error](data, status) !== true)
            ((new Response()).view('error', 404, { title: "Page of Error" })).renderResponse(res);

    }
    view(file_dir, status = 200, data) {

        file_dir = this.checkFile(file_dir);
        return new ResponseType('view', file_dir, status,
            { HOME_URL: this.CONFIGURATION_LIST['APP_URL'] + ":" + this.CONFIGURATION_LIST['APP_PORT'] },
            data, this.HEADERS
        );
    };


    json(data, status = 200) {
        return new ResponseType('json', null, status, null, data, this.HEADERS)
    }

    data(data, status = 200) {
        return new ResponseType('data', null, status, null, data, this.HEADERS);
    }

    checkFile(file) {
        let file_dir = 'views/' + file.replace('.', '/') + '.html';
        if (fs.existsSync(file_dir)) {
            return file_dir;
        }
        file_dir = 'views/' + file.replace('.', '/') + '.ejs';
        if (fs.existsSync(file_dir)) {
            return file_dir;
        }

        return false;
    }

    downloadFile(path_file, status = 200) {
        if (fs.existsSync(path_file)) {
            return new ResponseType('download', null, status, null, data, this.HEADERS);
        }
    }

    setHeader(key, value) {
        this.HEADERS = this.HEADERS.concat({ [key]: value });
    }
    deleteHeader(key) {
        for (const header of this.HEADERS)
            if (header[key] !== undefined)
                this.HEADERS.splice(this.HEADERS.indexOf(header), 1);
    }

}

class ResponseType {
    file;
    status;
    server_configuration;
    data;
    headers;
    type;
    constructor(type, file = null, status = null, server_configuration = null, data = null, headers = null) {
        this.type = type;
        this.file = file
        this.status = status
        this.server_configuration = server_configuration
        this.data = data
        this.headers = headers
    }

    renderResponse(res) {
        const setHeaders = (res, headers) => {
            if (typeof headers == undefined || headers.length == 0)
                return;

            for (const header of headers) {
                const key = Object.keys(header)[0];
                res.setHeader(key, header[key])
            }
        }

        setHeaders(res, this.headers)

        const response = {
            'view': () => {
                if (this.data && this.data !== undefined)
                    res.status(this.status).render(File.getDirPath(this.file), Object.assign(this.server_configuration, this.data, { statusCode: this.status }));
                else
                    res.status(this.status).render(File.getDirPath(this.file), Object.assign(this.server_configuration, { statusCode: this.status }));
                return true;
            },
            'json': () => {
                res.status(this.status).json(JSON.stringify(this.data));
                return true;
            },
            'data': () => {
                res.status(this.status).send(this.data);
                return true;
            },
            'download': () => {
                res.status(this.status).download(this.data);
                return true;
            },
        }
        if (response[this.type]() !== true)
            throw Error("Not possible execute this file");
        res.end();
    }
}
module.exports = Response;