export default function changeTheme(name:string){
    const themeEl = document.querySelector('#theme')
    switch(name){
        case '蓝绿色':
            themeEl?.setAttribute('href','./theme/default.css')
        break;
        case '灰紫色':
            themeEl?.setAttribute('href','./theme/night.css')
        break;
        case '樱花粉':
            themeEl?.setAttribute('href','./theme/pink.css')
        break;
    }
}