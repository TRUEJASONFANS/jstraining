const candidates = require('../candidate');
const path = require('path')
const APIError = require('../rest').APIError;
const { uploadFile } = require('../util/upload')

module.exports = {
    'GET /api/candidates': async (ctx, next) => {
        ctx.rest({
            candidates: candidates.getCandidates()
        });
    },

    'GET /api/candidates/:id': async (ctx, next) => {
        var c = candidates.getCandidate(ctx.params.id);
        if (c) {
            ctx.rest(c);
        } else {
            throw new APIError('candidate:not_found', 'candidate not found by id.');
        }
    },

    'POST /api/candidates': async (ctx, next) => {
        var c = candidates.createCandidate(ctx.request.body.name, ctx.request.body.email, parseFloat(ctx.request.body.phoneNumber));
        ctx.rest(p);
    },

    'DELETE /api/candidates/:id': async (ctx, next) => {
        console.log(`delete Candidate ${ctx.params.id}...`);
        var c = candidates.deleteCandidate(ctx.params.id);
        if (c) {
            ctx.rest(c);
        } else {
            throw new APIError('candidate:not_found', 'candidate not found by id.');
        }
    },
    'POST /api/upload': async (ctx, next) => {
        console.log('upload a file by post method');
        let result = {
            success: false
        }
        let serverFilePath = path.join(__dirname, '../upload-files')
        // 上传文件事件
        console.log(`file path: {serverFilePath}`);
        result = await uploadFile(ctx, {
            fileType: 'album',
            path: serverFilePath
        })
        ctx.body = result
    }
};
