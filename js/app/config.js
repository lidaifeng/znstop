/*
 * 配置文件，在这里你可以配置你需要的工具插件
 * 将一些工具js统一存放于这个模块，可以根据各个模块的需要动态添加js文件
 * 模块化编程增加代码的可读性，利于后期维护
 */
define(function() {
	require.config({

		paths: {/*在这里添加js文件存放的相对路径*/
			'jquery': '../jquery-3.2.1.min',
			'bootstrap': '../bootstrap.min',
			'ol': '../ol',
			'jquery-ui': '../jquery-ui.min'
			
		},
		shim: {/*为插件取个别名，利于外部文件引用*/
			'bootstrap': {
				deps: ['jquery'],
				exports: 'bootstrap'
			},
			'jquery-ui': {
				deps: ['jquery'],
				exports: 'jquery-ui'
			},
			'ol': {
				//deps: ['jquery'],
				exports: 'ol'
			}
		}

	})
})