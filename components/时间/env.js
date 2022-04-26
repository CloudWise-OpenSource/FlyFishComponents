
/**
 * @description 大屏配置
 */
window.DATAVI_ENV = (function() {
    var appPath = '/static/dev_visual_component/dev_workspace/comonComponent/Time';

    function formatEditorThumbSrc(imgName){
        return 'asserts/img/components/' + imgName;
    }

    return {
        debug: true,
        apiDomain: 'http://10.0.1.154:9090',
        componentsDir: 'components',
        // 大屏编辑器组件菜单枚举
        componentsMenuForEditor: [
            {
                name: '组件',
                icon: 'changyongzujian',
                components: [
                    {
                        type: 'Time',
                        name: '组件开发',
                        author: 'Cloudwise',
                        description: '',
                        thumb: formatEditorThumbSrc('system-hchart-line.png')
                    }
                ]
            }
        ]

    }
})();
