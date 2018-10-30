/**
 * ========================
 * module_name:[选择人员]
 * module_author:chenmo
 * module_create_date: 2017/8/4
 * module_desc:
 * ========================
 */
import Demo from '../pages/demo.vue'
import ueDemo from '../pages/ueDemo.vue'

// import visibileRangeDemo from '../pages/visibileRange/demo'

const routes = [{
    path: '/demo',
    name: 'demo',
    component: Demo,
    meta: {
        requireAuth: false,
        keepAlive: false,
        title: ''
    }
},
{
    path: '/ueDemo',
    name: 'ueDemo',
    component: ueDemo,
    meta: {
        requireAuth: false,
        keepAlive: false,
        title: ''
    }
}
]

export default routes