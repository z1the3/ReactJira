// const CracoLessPlugin = require('craco-less')

// module.exports = {
//     plugins: [
//         {
//             plugin: CracoLessPlugin,
//             options:{
//                 lessLoaderOptions:{
//                     lessOptions: {
//                         modifyVars: {'@primary-color':'rgb(0,82,20)','@font-size-base':'16px'},
//                         javascriptEnabled: true,
//                     }
//                 }
//             }
//         }
//     ]
// }
const CracoLessPlugin = require('craco-less')

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': 'rgb(0,82,20)',
                            '@font-size-base': '16px',
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
}
