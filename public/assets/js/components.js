
//
//  Mithril File Upload Component
//
var File = function (data) {
    this.name = m.prop(data.name)
    this.type = m.prop(data.type)
    this.size = m.prop(data.size)
    this.status = m.prop(data.status || 'q')
    this.thumb  = m.prop(data.status || null)
}

var UploadComponent = {

    controller: function (options) {

        options = options || {}

        if ( ! options.url) {
            alert("Upload 'url' is required");
            return
        }

        this.list = []

        this.upload = function (files) {

            for (var i = 0, file; file = files[i]; i++) {

                // file.status = (file.size > 51200) ? 'e' : null // TODO: options.maxSize

                var n = this.list.push(new File({
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    status: file.status
                }))

                // upload
                if (this.list[n-1].status() == 'q') {

                    var formData = new FormData
                    formData.append(i, file)

                    // passes the FormData object intact to the underlying XMLHttpRequest
                    m.request({
                        method: 'POST',
                        url: options.url,
                        background: true, // note: asynch
                        data: formData,
                        serialize: function (value) { return value }
                    }).then(this.uploaded)
                }
            }
        }.bind(this)

        this.uploaded = function (response) {

            if (typeof options.onUpload == 'function') {
                options.onUpload(response.uploaded[0])
            }

            for (var i = 0; i < this.list.length; i++) {
                if (this.list[i].name() == response.uploaded[0]['name']) {
                    this.list[i].status('u')
                    break
                }
            }
            m.redraw(true)
        }.bind(this)
    },

    view: function (ctrl) {

        return m('.upload-container', [

            m.component(Uploader, {
                text: "Drop Files Here",
                onchange: ctrl.upload
            }),

            m('ul.uploads', ctrl.list.map(function (file) {
                return m('li', [
                    m('', file.status() + ": '" + file.name() + "' (" + file.type() + " " + file.size() + " bytes)"),
                    file.thumb() ? m('img', {src: file.thumb(), style:{height:'64px', width:'64px'}} ) : null
                ])
            }))
        ])
    }
}

var Uploader = {

    /**
     *
     *  @param  args
     */
    controller: function (args) {

        this.textDropHere = args.text

        this.dragover = function (evt) {
            evt.preventDefault()
            this.classList.add('dragover')
        }

        this.dragleave = function (evt) {
            this.classList.remove('dragover')
        }

        this.ondrop = function (evt) {
            evt.preventDefault()
            this.classList.remove('dragover')
            if (typeof args.onchange == 'function') {
                args.onchange((evt.dataTransfer || evt.target).files)
                // this.classList.add('drop')
            }
        }
    },


    /**
     *
     *  @param  ctrl
     *  @param  args
     */
    view: function (ctrl, args) {
        return m('.uploader', {
            ondragover:  ctrl.dragover,
            ondragleave: ctrl.dragleave,
            ondrop:      ctrl.ondrop
        }, ctrl.textDropHere)
    }

}
