const pickrContainer = document.querySelector('.pickr-container');
let currentSetting = "--bg-color"
let pickr = null

function setSetting(input) {
    if (localStorage.getItem('switchedTheme') === 'true') {
        currentSetting = '--light-' + input
    } else {
        currentSetting = '--dark-' + input
    }
    console.log(currentSetting)

    const el = document.createElement('p');
    pickrContainer.appendChild(el);

    if (pickr) {
        pickr.destroyAndRemove();
    }

    pickr = new Pickr({
        el: el,
        theme: 'classic', // or 'monolith', or 'nano'

        swatches: [
            'rgba(244, 67, 54, 1)',
            'rgba(233, 30, 99, 0.95)',
            'rgba(156, 39, 176, 0.9)',
            'rgba(103, 58, 183, 0.85)',
            'rgba(63, 81, 181, 0.8)',
            'rgba(33, 150, 243, 0.75)',
            'rgba(3, 169, 244, 0.7)',
            'rgba(0, 188, 212, 0.7)',
            'rgba(0, 150, 136, 0.75)',
            'rgba(76, 175, 80, 0.8)',
            'rgba(139, 195, 74, 0.85)',
            'rgba(205, 220, 57, 0.9)',
            'rgba(255, 235, 59, 0.95)',
            'rgba(255, 193, 7, 1)'
        ],

        components: {

            // Main components
            preview: true,
            opacity: true,
            hue: true,
            comparison: false,
            closeWithKey: 'Escape',

            // Input / output Options
            interaction: {
                hex: true,
                rgba: true,
                hsla: true,
                hsva: true,
                cmyk: true,
                input: true,
                clear: true,
                save: true
            }
        },

        default: getComputedStyle(document.querySelector('.theme-switch')).getPropertyValue(currentSetting).replace(/ /g,'')
    });

    pickr.on('init', instance => {

        // Grab actual input-element
        const {result} = instance.getRoot().interaction;

        // Listen to any key-events
        result.addEventListener('keydown', e => {

            // Detect whever the user pressed "Enter" on their keyboard
            if (e.key === 'Enter') {
                instance.applyColor(); // Save the currently selected color
                instance.hide(); // Hide modal
            }
        }, {capture: true});
    }).on('change', (color, source, instance) => {
        let colour = color.toRGBA();
        document.querySelector(':root').style.setProperty(currentSetting, `rgba(${colour[0]},${colour[1]},${colour[2]},${colour[3]})`)
        localStorage.setItem(currentSetting, `rgba(${colour[0]},${colour[1]},${colour[2]},${colour[3]})`)
    }).on('save', (color, instance) => {
        let colour = color.toRGBA();
        document.querySelector(':root').style.setProperty(currentSetting, `rgba(${colour[0]},${colour[1]},${colour[2]},${colour[3]})`)
        localStorage.setItem(currentSetting, `rgba(${colour[0]},${colour[1]},${colour[2]},${colour[3]})`)
        console.log('Instance: ' + instance)
    }).on('swatchselect', (color, instance) => {
        let colour = color.toRGBA();
        document.querySelector(':root').style.setProperty(currentSetting, `rgba(${colour[0]},${colour[1]},${colour[2]},${colour[3]})`)
        localStorage.setItem(currentSetting, `rgba(${colour[0]},${colour[1]},${colour[2]},${colour[3]})`)
    });
}