/**
 *
 *
 *
**/


/**
 *  FP-friendly
 *
 * @param val
 */
var log = function (val) {
    console.log( val )
    return val
}


/**
 * Layout Mixin
 *
 * @param layout
 * @param body
 * @param sidebar
 */
var mixinLayout = function (layout, body, sidebar) {
    return layout(body, sidebar)
}

/**
 * Main Layout
 *
 * @param body
 * @param sidebar
 */
var layoutMain = function (body, sidebar) {
    return m('', [

        Overlay ?
            m('#overlay', {
                    onclick: function () {
                        Overlay = null
                    }
            }, Overlay)
        : null,

        m('header', m('.content', [

            m('h1', "iswym"),

            m('.pure-menu.pure-menu-horizontal',
                m('ul.pure-menu-list', [
                    m('li.pure-menu-item',
                        m('a.pure-menu-link', { config: m.route, href: '/' }, "Home")
                    ),
                    m('li.pure-menu-item',
                        m('a.pure-menu-link', { config: m.route, href: '/blog' }, "Blog")
                    ),
                    m('li.pure-menu-item',
                        m('a.pure-menu-link', { config: m.route, href: '/about' }, "About")
                    ),
                    m('li.pure-menu-item',
                        m('a.pure-menu-link.admin-link', {
                            href: '/admin',
                            onclick: function (evt) {
                                if ( ! APP.login) {
                                    evt.preventDefault()
                                    Overlay = m.component(loginOverlay)
                                }
                            }
                        }, (APP.login ? "Admin" : "Login"))
                    ),
                    APP.login ?
                        m('li.pure-menu-item',
                            m('a.pure-menu-link.admin-link', {href: '/auth/logout'}, "Logout")
                        )
                    : null
                ])
            )
        ])),

        m('main',
            m('.content',
                m('.pure-g', [
                    m('.pure-u-1.pure-u-md-3-4', body),
                    m('.pure-u-1.pure-u-md-1-4', [
                        m('h2', "SIDE"),
                        sidebar
                    ])
                ])
            )
        ),

        m('footer',
            m('.content', [
                m('.pure-g', [
                    m('.pure-u-1.pure-u-md-1-2', "Footer"),
                    m('.pure-u-1.pure-u-md-1-2',
                        m('a', {href: '/auth/login'}, "Login")
                    )
                ])
            ])
        ),
    ])
}


/**
 * Page Overlay
 *
 * @type Object
 */
var Overlay = null


/**
 * Overlay with Login form
 *
 * @type Object
 */
var loginOverlay = {

    view: function (ctrl) {

        return m('.login', {

            onclick: function (evt) {
                evt.stopPropagation()
            }

        }, [
            m('form.pure-form.pure-form-stacked',
                {
                    method: 'POST',
                    action: '/auth/login'
                },
                [
                    m('input[type=hidden]', {
                        name: '_token',
                        value: APP.csrf
                    }),

                    m('label[for=name]', "Name"),
                    m('input#name.pure-u-1[autofocus]', {name: 'name'}),

                    m('label[for=password]', "Password"),
                    m('input#password[type=password].pure-u-1', {name: 'password'}),

                    m('button.pure-button.pure-button-primary', "Login"),
                ]
            ),
        ])
    }
}


/**
 * Post Model
 *
 * @param {Object} data
 */
var Post = function (data) {

    data = data || {}

    this.id       = m.prop(data.id          || null)
    this.title    = m.prop(data.title       || "No Posts")
    this.body     = m.prop(data.body        || "")
    this.html     = m.prop(data.html        || "")
    this.date     = m.prop(data.created_at  || "")
    this.user_id  = m.prop(data.user_id     || 0)
    this.user     = m.prop(data.user        || [])
    this.comments = m.prop(data.comments    || [])
}


/**
 * XHR get list of Posts
 *
 * @param {Object} data
 */
Post.list = function () {
    if (Post.list_cache()) return Post.list_cache
    return m.request({
        method: 'GET',
        url: '/api/posts',
        type: Post
    }).then(Post.list_cache)
}

/**
 * Simple cache for Post.list
 *
 * @param {Object} data
 */
Post.list_cache = m.prop()

/**
 * XHR get list of Posts
 *
 * @param {Object} data
 */
Post.get = function () {
    return m.request({
        method: 'GET',
        url: '/api/post/' + m.route.param('id'),
        type: Post
    })
}


/**
 * Comment Model
 *
 * @param {Object} data
 */
var Comment = function (data) {

    data = data || {}

    this.body = m.prop(data.body || "")
}

Comment.post = function (comment, callback) {
    return m.request({
        method: 'POST',
        url: '/admin/comment',
        config: function(xhr) {
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
        },
        unwrapSuccess: function (resp) {
            if (resp.error) {
                alert(resp.error)
            } else {
                callback()
            }
        },
        data: {
            post_id: m.route.param('id'),
            comment_body: comment.body(),
            _token: APP.csrf
        }
    })
}


/**
 * List Posts
 *
 * @type Object
 */
var PostsListComponent = {

    controller: function (args) {
        return {
            title: args.title || "Posts"
        }
    },

    view: function (ctrl, args) {
        return m('.posts-list', [

            m('h3', ctrl.title),
            m('.pure-menu',
                m('ul.pure-menu-list', args.postList().map(function (post) {
                    return m('li.pure-menu-item',
                        m('a.pure-menu-link', {
                            config: m.route,
                            href: '/blog/' + post.id()
                        }, post.title())
                    )
                }))
            )
        ])
    }
}


/**
 * Comment Form
 *
 * @type Object
 */
var AddCommentComponent = {

    controller: function (args) {
        return {
            comment: new Comment()
        }
    },

    view: function (ctrl, args) {
        return m('form.pure-form', {
            onsubmit: function (evt) {
                evt.preventDefault()
                Comment.post(ctrl.comment, function () {
                    ctrl.comment.body("")
                    args.post = Post.get(args.post().id()).then(m.redraw)
                })
            }
        }, [
            m('', m.trust("Hello <em>" + APP.login + "</em> You may post comments :)")),
            m('textarea[name=comment][placeholder=Comment].pure-u-1', {oninput: m.withAttr('value', ctrl.comment.body), value: ctrl.comment.body()}),
            m('button[type=submit].pure-button', "OK")
        ])
    }
}


/**
 * User Registeration Form
 *
 * @type Object
 */
var RegisterComponent = {

    controller: function (args) {},

    view: function (ctrl, args) {
        return m('.register', [

            m('h4', "Register to Comment"),
            m('form.pure-form', {
                method: 'POST',
                url: '/auth/register',
            }, [
                m('input[name=name][placeholder=Name].pure-u-1', {disabled: 'disabled'}),
                m('input[name=password][placeholder=Password].pure-u-1', {disabled: 'disabled'}),
                m('input[type=hidden]', { name: '_token', value: APP.csrf}),
                m('button[type=submit].pure-button', {disabled: 'disabled'}, "OK"),
                m('', m.trust("<em>Registrations are disabled.<br>Only Administrators may comment.</em>"))
            ])
        ])
    }
}


/**
 * module for Pages
 *
 * @type Object
 */
var viewPage = {

    controller: function () {

        var content = m.prop({})
        var postList = Post.list()

        // These would be XHRs for Page Models
        switch ( m.route.param('page') ) {

            case 'blog':
                content([
                    m('h2', "BLOG Entries"),
                    m.component(PostsListComponent, {
                        title: "Here are all the posts", // unpaginated :\
                        postList: postList
                    })
                ])
            break

            case 'about':
                content([
                    m('h2', "ABOUT the iswym blog."),
                    m('p', "About About About About About About About About About ")
                ])
            break

            default:
                content([
                    m('h2', "HOME of the iswym blog."),
                    m('p', "This is the blog of iswym. This is the blog of iswym. This is the blog of iswym. ")
                ])
        }

        return {
            content: content,
            postList: postList
        }
    },

    view: function (ctrl) {

        document.title = "iswym"

        return mixinLayout(
            layoutMain,
            [
                ctrl.content()
            ],
            [
                m.component(PostsListComponent, {
                    // title: "Archive",
                    postList: ctrl.postList
                }),
                m.component(RegisterComponent, {})
            ]
        )
    }
}


/**
 * module for Posts
 *
 * @type Object
 */
var viewPost = {

    controller: function () {
        return {
            post: Post.get(m.route.param('id'))
        }
    },

    view: function (ctrl) {

        document.title = "iswym - " + ctrl.post().title()

        return mixinLayout(
            layoutMain,
            [
                // Post
                m('h2.post-title', ctrl.post().title()),
                m('.post-info',  [
                    m('strong', ctrl.post().user().name), " wrote this on ", m('em', ctrl.post().date())
                ]),
                m('.post-body', m.trust(ctrl.post().html())),

                // should be a plug-in of some sort
                APP.login ?
                    m('a.pure-button.pure-button-primary' , { href: '/admin/post/' + ctrl.post().id() }, m.trust("Edit"))
                : null,

                m('hr'),

                // Comments
                m('h4', "Comments"),
                m('.comments', ctrl.post().comments().map(function (comment) {
                    return m('.comment', [
                        m('p.comment-body', comment.body),
                        m('p.comment-info', [
                            m('strong', comment.user.name), " wrote this on ", m('em', comment.created_at)
                        ]),
                    ])
                })),

                m('hr'),

                // Add Comment
                APP.login ? [
                    m.component(AddCommentComponent, {post: ctrl.post})
                ]
                : [
                    m('pure-g', [
                        m('.pure-u-1-2', m.component(RegisterComponent)),
                        m('.pure-u-1-2', m('h4', "Terms & Conditions"))
                    ])
                ],
            ],
            [
                m.component(PostsListComponent, {
                    title: "Archive",
                    postList: Post.list()
                })
            ]
        )
    }
}
