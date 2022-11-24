const path = require('path');
const htmlWebpackPlugins = require('html-webpack-plugin');
//const miniCssExtratPlugin = require('mini-css-extract-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Copyplugin = require('copy-webpack-plugin');
const { url } = require('inspector');
const { loader } = require('mini-css-extract-plugin');
const miniMinimizerPlugin = require('css-minimizer-webpack-plugin');
const terserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const Dotenv= require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports={

//vamos a crear un modulo que vamos a exportar con la configuracion deseada.
    entry: './src/index.js',  // nos va a decir cual es nuestro punto de entrada de nuestra aplicacion.    cual es elemento inicial de nuestra aplicacion.
    output: {
        path: path.resolve(__dirname, 'dist'),   //path para traer resolve, que nos va a servir donde se encuentro nuetrp proyecto en que directorio y poderlo utilziar de esta forma no tener que tener iun problema con el nombre de la caprta dponde estou posicionado. con esto garantizamos que siempre va a encontrar la carpeta donde se va a guardar nuestro codifo optimizsado con webpack.
        filename : '[name].[contenthash].js',// ahora ponemos un nombre al resultandte del js que se va a unificar 
        //assetsModuleFilename: 'assets/images/[hash][ext][query]'
    },  // estrablecer a donde va a enviar lo que va a preparar webpack,para esto webpack ya tiene una ruta predefinida para esto que es la carpeta dist y en el archivo main.js

    resolve : {
        extensions : ['.js'], // ahora, que queremos pasarle o que etensiones vamos a trabajr en este proyecto, se pasan en este array las extensiones que se va a trabajar.
        alias : {
            '@utils' : path.resolve(__dirname, "src/utils/"),
            '@templates' : path.resolve(__dirname, "src/templates/"),
            '@styles' : path.resolve(__dirname, "src/styles/"),
            '@images' : path.resolve(__dirname, "src/assets/images/"),

        }
    },

    module :{ // esto es un objeto

        rules : [  // estas son las reglas que vamos a establecer que vana  definir como vamos a trabajr con diferentes tipos de arhivos o elementos,dentro de este proyecto.
            { // en este objeto va a ser para trabajar con babel loader  y poder conectar nuestro webpack con babel
                test :  /\.m?js$/,  // este test nos permite saber que tipo de extensiones se van a utilizar. se crea una eoxresion regular. cualquier archivo que empice con m o . js y cirerra $ 
                exclude : /node_modules/,  // vamos a exckuir n o quierto que utlice los modulos o arhico js que esten en node_modules, por que o si no nuestra apliacion se romperia
                use:{  // en use le pasamos internamente el loader que vamos a utilizar le indicamos que utilice babel.
                    loader : 'babel-loader'
                }
            },
            {
                test: /\.(css|styl)$/i,
                use : [MiniCssExtractPlugin.loader, 'css-loader','stylus-loader'], // para poder decirle cual es el elemento que vamos a tener, podemos teneer con un array o un objeto.
            },
            {
                test : /.png$/,
                type: 'asset/resource' // de esta famos podemos importar los recursos
            },
            {
                test : /\.(woff|woff2)$/,
                use :{
                    loader : 'url-loader', // use para pder trabajar con el loader que vamos a tener 
                    options: { // le pasamos unas opciones que necesitamos para poder decir donde estan los archivos tcs
                        limit : 10000, // limit
                        mimetype: "application/font-woff",  // tipo de dato quye estamos utilizando 
                        name: "[name].[contenthash].[ext]", // en este casop le decimos que respete el nombre que tiene y la extension
                        output: './assets/fonts/', // donde se va a guadar las fonts en la caprte dist
                        publicPath: "./assets/fonts/",// public
                        esModule : false // para decirle que ewsto es falso no lo vamos a utilizar en esta consiguracion 
                    }
                }

            }
        ]

    },

    plugins : [
        new htmlWebpackPlugins({ // a la instancion de del recurso html se le pasa un objeto, donde vamos a tener  las configuraciones que vamos a añadir a lo que viene siendo el ploguin que estamos utilizando,
            inject: true, // para que haga la incersion de los elemento
            template : './public/index.html', // el template 
            filename : './index.html' // cual es el resultado de la preparacion del HTML, este resultado lo va a poner en la carpetra de distribution con el nombre index.html
        }),
        new MiniCssExtractPlugin({
            filename : 'assets/[name].[contenthash].css'
        }),
        new Copyplugin({
            patterns:[
                {
                    from : path.resolve(__dirname,"src", "assets/images"),
                    to : "assets/images"                
                }
            ]
        }),
        new Dotenv({
            path : path.resolve(__dirname,'.env'),
        }),
        new CleanWebpackPlugin(),

    ],

    optimization : {
        minimize : true,
        minimizer :[
            new CssMinimizerPlugin(), // esto es para optimizar el css
            new terserPlugin(), // este es para optimizar el js
        ]
    }





    
   

    // una vez tenemos listo este arhico de configuraciones, p0odemos preparar neuestro proyecto con webpack.

    //para conpilar con webpacñ y pasarle estas configiraciones, lo hacemos desde la consola con npx webpack --mode production --config webpack.config.js

}