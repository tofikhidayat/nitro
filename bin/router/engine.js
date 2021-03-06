'use strict'
import router from '../../nitros/router'
import chalk from 'chalk'
import {compile} from '../compiler'
import collection from './collection'

/**
 * Handle router default
 * @param {*} router 
 */

const routerDefault = (app, action) => {
    
    const props = {
        route: null,
        render: null,
        response: null
    }   

    // handle execution route
     
    const exec = () => {
        
    }

    // handle default response
    const response = mainResponse => {
        return app.get(props.route, async (req, res, next) => {
            return await mainResponse({
                req: req,
                res: res,
                next: next,
                render: render
            })
        })
    }
    
    // handle response when render file
    const render = (file, args) => {
        return app.get(props.route, async (req, res) => {
            const compiled = await compile(file, args)
            res.send(compiled)
            return res.end()
        })
    }

    const route = path => {
        props.route = path
        return {
            render: render, 
            response: response,
            collection: collection
        }
    }
    return action(route);
}


const routerEngine = (app) => {
    routerDefault(app, router)
}


export default routerEngine