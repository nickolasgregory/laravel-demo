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
                    )
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
                    m('.pure-u-1.pure-u-md-1-2', "Footer Thing 1"),
                    m('.pure-u-1.pure-u-md-1-2', "Footer Thing 2")
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
                    m('input#name.pure-u-1', {name: 'name'}),

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

    this.id     = m.prop(data.id     || null)
    this.title  = m.prop(data.title  || "No Posts")
    this.body   = m.prop(data.body   || "")
    this.author = m.prop(data.author || "")
    this.date   = m.prop(data.date   || "")
}

/**
 * XHR get list of Posts
 *
 * @param {Object} data
 */
Post.list = function () {
    return m.request({
        method: 'GET',
        url: '/api/posts',
        type: Post
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
                            href: '/post/' + post.id()
                        }, post.title())
                    )
                }))
            )
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
                m('input[name=name][placeholder=Name].pure-u-1'),
                m('input[name=password][placeholder=Password].pure-u-1'),
                m('input[type=hidden]', { name: '_token', value: APP.csrf }),
                m('button[type=submit].pure-button', "OK")
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

        // These would be XHR requests for 'page'
        switch ( m.route.param('page') ) {

            case 'about':
                content([
                    m('h2', "ABOUT the blog of iswym."),
                    m('p', "About About About About About About About About About ")
                ])
            break

            default:
                content([
                    m('h2', "The iswym blog."),
                    m('p', "This is the blog of iswym. This is the blog of iswym. This is the blog of iswym. "),
                    m.component(PostsListComponent, {
                        title: "Here are all the posts", // unpaginated :\
                        postList: postList
                    })
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
                m.component(RegisterComponent, {}),
                m.component(PostsListComponent, {
                    // title: "Archive",
                    postList: ctrl.postList
                })
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
            postList: Post.list(),
            post: m.request({
                method: 'GET',
                url: '/api/post/' + m.route.param('id'),
                type: Post
            })
        }
    },

    view: function (ctrl) {

        document.title = "iswym - " + ctrl.post().title()

        return mixinLayout(
            layoutMain,
            [
                // Post
                m('h2.post-title', ctrl.post().title()),
                m('em.post-author', ctrl.post().author()),

                m('hr'),
                m('br'),
                m('.post-body', m.trust(ctrl.post().body())),
                m('br'),
                m('hr'),

                // Comments

                // should be a plug-in of some sort
                APP.login ?
                    m('a.pure-button' , { href: '/admin/post/' + ctrl.post().id() }, m.trust("Edit"))
                :null
            ],
            [
                m.component(RegisterComponent, {}),
                m.component(PostsListComponent, {
                    title: "Archive",
                    postList: ctrl.postList
                })
            ]
        )
    }
}
