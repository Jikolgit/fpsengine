#include <fog_pars_fragment>
    uniform float utime;
    uniform vec3 uColor;
    varying vec2 vUv;

      void main() {
        float strenght = length(vUv-0.5);
        // vec4 blueCol = vec4(uColor,0.8);
        // vec4 mixedColor = mix(vec4(0.0,0.0,0.0,0.0),blueCol*vUv.x,strenght);
        // gl_FragColor.rgba = vec4(1.0,0.0,0.0, 1.0);
        gl_FragColor.rgba = vec4(strenght,strenght,strenght,1.0);
        #include <fog_fragment>
        // gl_FragColor.rgba = vec4(strenght,strenght,strenght, 1.0);
        
      }
