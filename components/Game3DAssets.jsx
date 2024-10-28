/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.4.1 ./public/model.glb 
*/
// FILE CONTAINING ALL THE 3D ASSET ON THE GAME
import * as THREE from 'three'
import React, { useContext, useEffect, useMemo, useRef } from 'react'
import { Point, Points, useGLTF, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import { appContext } from '../src/App';
import { mobContext } from './mob_2';
import { gameAppContext } from './GameApp';
import { CustomCounter } from './utils';
import vertex from './vertex.glsl'
import frags from './frags.glsl'
function prepareTexture(texture)
{
  const _texture = useTexture(texture);
  _texture.flipY = false;
  _texture.colorSpace = THREE.SRGBColorSpace; 
  _texture.minFilter = THREE.LinearFilter;
  _texture.magFilter = THREE.LinearFilter;

  return _texture;
}
export function GroundModel(props) {
  // 3D ASSET OF THE GROUND
  let _appContext = useContext(appContext)
  const { nodes, materials } = useGLTF('/model.glb');
  let _texture = prepareTexture('groundtxt.jpg');
 
  let mat = new THREE.MeshBasicMaterial({map:_texture,wireframe:true});
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.dground.geometry} material={mat} />
    </group>
  )
}
export function SpearModelOnMap(props) {
  let _appContext = useContext(appContext)
  const { nodes, materials } = useGLTF('/model.glb');
  let passedTime = 0 ;
  let modelRef = useRef(null)
  let _texture = prepareTexture('gametexture.jpg');
  let mat = new THREE.MeshBasicMaterial({map:_texture,visible:props._visible,wireframe:_appContext.devMode.current? true : false});
  let visibleStatut;

  useFrame(()=>
    {
      if(!_appContext.gamePause.current)
      {
        passedTime += 1/40;
        modelRef.current.position.y += Math.sin(passedTime)/400;
        if(props.name == 'triangle'){modelRef.current.rotation.y += (0.1/4);}
        else if(props.name == 'torus'){modelRef.current.rotation.z += (0.1/4);}
        
      }
      
    })
  return (
      <>
      {/* <mesh ref={modelRef}
            rotation={[0,0,Math.PI*0.1]} 
            geometry={nodes.spear_1.geometry} material={mat} position={[props.posX,props.posY,props.posZ]} /> */}
      {/* <mesh ref={modelRef}>
            <boxGeometry args={[1,1,1]} />
            <meshBasicMaterial color={'yellow'} wireframe />
      </mesh> */}
      {props.name == 'triangle' && <mesh ref={modelRef} geometry={nodes.playerBullet_1.geometry}>
            <meshBasicMaterial color={'yellow'} wireframe />
      </mesh>}
      {props.name == 'torus' && <mesh position={[0,0.5,0]} ref={modelRef} geometry={nodes.playerBullet_2.geometry} rotation={[Math.PI*0.5,0,0]}>
            <meshBasicMaterial color={'yellow'} />
      </mesh>}
      <CustomParticle _skin={'star_07.png'} _size={0.5} _color={'red'} _speed={1} _number={30} x={props.posX} z={props.posZ} />
      </>
      
  )
}
export function SpearModel(props) {
  let _appContext = useContext(appContext)
  const { nodes, materials } = useGLTF('/model.glb');
  let modelRef = useRef(null)
  let _texture = prepareTexture('gametexture.jpg');
  // let mat = new THREE.MeshBasicMaterial({map:_texture,visible:props._visible,wireframe:_appContext.devMode.current? true : false});
  let mat = new THREE.MeshBasicMaterial({color:'yellow',visible:props._visible,wireframe:true});
  let spear2HeadMat = new THREE.MeshBasicMaterial({color:'blue',side:THREE.BackSide,transparent:true,opacity:0.1});
  let visibleStatut;

  useFrame(()=>
    {
      // modelRef.current.rotation.x += 0.05
    })
  useEffect(()=>
    { 
      props.controller.bulletModelController.value[props.controller.index] = (args)=>
      {
          if(args == 'SHOW-BULLET')
          {
            modelRef.current.children[0].material.visible = true;
            // modelRef.current.children[1].material.visible = true;
          }
          else if(args == 'HIDE-BULLET')
          {
            modelRef.current.children[0].material.visible = false;
          }
      } 
    },[])
  return (
      <>
      {/* <mesh ref={modelRef}
            
            rotation={[Math.PI*0.5,0,0]} 
            geometry={nodes.spear_1.geometry} material={mat} position={[props.posX,props.posY,props.posZ]} /> */}
      {/* <mesh ref={modelRef} material={mat}>
            <boxGeometry args={[0.5,0.5,0.5]} position={[props.posX,props.posY,props.posZ]}/>
            
      </mesh> */}
      <group ref={modelRef} position={[props.posX,props.posY,props.posZ]}
      >
              <mesh scale={0.3} rotation={[Math.PI*0.5,Math.PI*0.2,0]}  material={mat} geometry={nodes.playerBullet_1.geometry} >
                    <meshBasicMaterial color={'yellow'} wireframe visible={props._visible} />
              </mesh>
              <mesh scale={1.5} material={mat} geometry={nodes.playerBullet_1.geometry}  >
                    <meshBasicMaterial color={'red'} wireframe visible={props._visible} />
              </mesh>
      </group>
      
      {/* <mesh ref={modelRef} geometry={nodes.spear_2.geometry} material={mat} position={[props.posX-0.1,props.posY,props.posZ+0.2]} rotation={[Math.PI*0.5,0,0]}>
        <mesh visible={false} geometry={nodes.spear_2_head.geometry} material={spear2HeadMat} position={[0, 0.79, 0.001]} scale={1.227} />
      </mesh> */}
      </>
      
  )
}
export function PlayerCursor(props)
{
  return(<sprite 
          position={[props.x,props.y+0.05,props.z]} scale={0.015}
        >
          <spriteMaterial rotation={Math.PI*0.25} color={'white'}   />
          
        </sprite>
  )
}
export function Dummy_1_model(props) {
  let _mobContext = useContext(mobContext)
  const { nodes, materials } = useGLTF('/model.glb');
  let _appContext = useContext(appContext)
  let _texture = prepareTexture('gametexture.jpg');

  let modelRef = useRef(null);
  let mobHitManager = {startEffect:false,timer:10,effectCount:0}
  // let mat = new THREE.MeshBasicMaterial({map:_texture});
  let mat = new THREE.MeshBasicMaterial({color:'red',wireframe:true});
  let visibleStatut;

  useFrame((clock)=>
    {
      if(!_appContext.gamePause.current)
      {
        // modelRef.current.rotation.y += (1/250);
        
        if(mobHitManager.startEffect)
        {
          mobHitManager.timer--;
          if(mobHitManager.timer == 0)
          {
            mobHitManager.effectCount ++;
            mobHitManager.timer = 10;
            
            if(mobHitManager.effectCount<7)
            {
              modelRef.current.children[0].visible = modelRef.current.children[0].visible? false : true;
            }
            else
            {
              mobHitManager.effectCount = 0;
              mobHitManager.startEffect = false;
              modelRef.current.children[0].visible = false;
            }
            
          }
        }
      }
      
    })
  useEffect(()=>
    {
      _mobContext.enemyFunc.current = (args)=>
        {
          if(args == 'REMOVE-MOB')
          {
            modelRef.current.material.visible = false;
          }
          else if(args == 'MOB-TOUCHED')
          {
            // modelRef.current.children[0].visible = false;
            // mobHitManager = {startEffect:false,timer:10,effectCount:0}
            // mobHitManager.startEffect = true
          }
        }
    },[])
  return (

    <>
    <mesh ref={modelRef} geometry={nodes.pmob_0.geometry} material={mat} position={[props.x,0.1,props.z]}>
           
    </mesh>
    <mesh position={[props.x,0.1,props.z]} visible={false}
    >
        <boxGeometry args={[2,2,2]}  />
        <meshBasicMaterial wireframe color={'red'} />
        <BulletCollisionEffect />
    </mesh>
    </>
    // <mesh ref={modelRef} geometry={nodes.dummy_1.geometry} material={mat} position={[props.x,0.1,props.z]}>
    //       <mesh geometry={nodes.dummy_1.geometry} visible={false} scale={1}>
    //           <meshBasicMaterial color={'red'}  />
    //       </mesh>
    // </mesh>
            
      
  )
}
export function TreeDecor_model(props) {
  const { nodes, materials } = useGLTF('/model.glb');
  let _texture = prepareTexture('texture1.jpg');
  // let mat = new THREE.MeshBasicMaterial({map:_texture});
  // let mat = new THREE.MeshBasicMaterial({color:'white',wireframe:true});
  const mat = new THREE.MeshMatcapMaterial({color:'white'})
  const mat2 = new THREE.MeshMatcapMaterial({color:'green'})
  return (

    // <mesh  geometry={nodes.tree.geometry} material={mat} position={[props.x,0,props.z]} />
    
    <mesh geometry={nodes.pdecor_1.geometry} material={mat} position={[props.x,0,props.z]}>
        <mesh geometry={nodes.pdecor_1_leaf.geometry} material={mat2} />
    </mesh>
            
      
  )
}
export function WallModel(props)
{
  const { nodes, materials } = useGLTF('/model.glb');
  let _texture = prepareTexture('gametexture.jpg');
  let wallRef = useRef(null);
  // let mat = new THREE.MeshBasicMaterial({map:_texture});
  const mat = new THREE.MeshMatcapMaterial({color:'blue'})
  useEffect(()=>
    { 
      props.controller.wallController.value[props.controller.index] = (args)=>
      {
          if(args == 'SHOW-WALL')
          {
            wallRef.current.visible = true;
          }
          else if(args == 'REMOVE-WALL')
          {
            wallRef.current.visible = false;
          }
      } 
    },[])
  return(
    // <mesh ref={wallRef} geometry={nodes.wall_1.geometry} material={mat} position={[props.x,0,props.z]} />
    <mesh ref={wallRef} geometry={nodes.pwall_2.geometry} material={mat} position={[props.x,0,props.z]} />
  )
}
export function ItemType2Model(props) {
   //GERE LES ITEMS 3D SUR LA MAP Y COMPRIS LES ITEMS QUE LES MOBS
  let _appContext = useContext(appContext)
  const { nodes, materials } = useGLTF('/model.glb');
  let textureSrc;
  if(props.skin == 'wall_1'){textureSrc = 'gametexture.jpg'}
  else{textureSrc = 'texture2.jpg'}
  let _texture = prepareTexture(textureSrc);
  let itemRef = useRef(null);
  let itemGroupRef = useRef(null)
  let containerMat = new THREE.MeshBasicMaterial({visible:false});
  let mat = new THREE.MeshBasicMaterial({map:_texture,visible:true});
  const healmat = new THREE.MeshMatcapMaterial({color:'green'})
  useFrame((clock)=>
  {
    if(!_appContext.gamePause.current)
    {
      if(props.skin == 'heal_item_1')
      {
        itemRef.current.rotation.y += (1/30);
      }
      
    }
    
  })
  useEffect(()=>
    { 
      props.controller.itemController.value[props.controller.index] = (args)=>
      {
          if(args == 'SHOW-ITEM')
          {
            itemGroupRef.current.visible = true;
          }
          else if(args == 'REMOVE-ITEM')
          {
            itemGroupRef.current.visible = false;
          }
      } 
    },[])
  
  return (
      <>
      <group
            ref={itemGroupRef}
      >
          {/* {props.skin == "heal_item_1" && <mesh ref={itemRef}  geometry={nodes.healthBox.geometry} material={containerMat} position={[props.x,0.1,props.z]}>
          <mesh geometry={nodes.health_1.geometry} material={mat} position={[-0.004, 0.5, 0.043]} rotation={[0.585, 0, 0]} />
            
          </mesh>} */}
          {props.skin == "heal_item_1" && <mesh ref={itemRef} scale={0.5} geometry={nodes.pheal_1.geometry} material={healmat} position={[props.x,0.1,props.z]} />}
          {props.skin == "heal_item_1" && <CustomParticle _skin={'star_07.png'} _size={0.5} _color={'green'} _speed={1} _number={30} x={props.x} z={props.z} />}
          {props.skin == "triangle" && 
                      <mesh
                          position={[props.x,0.5,props.z]}
                      >
                          <boxGeometry args={[1,0.5]} />

                          <meshBasicMaterial color={'blue'} visible={false} />
                          <SpearModelOnMap name={props.skin} _visible={true} posX={0} posY={0} posZ={0} />
                          
                      </mesh>
          }
          {props.skin == "torus" && 
                      <mesh
                          position={[props.x,0.5,props.z]}
                      >
                          <boxGeometry args={[1,0.5]} />

                          <meshBasicMaterial color={'blue'} visible={false} />
                          <SpearModelOnMap name={props.skin} _visible={true} posX={0} posY={0} posZ={0} />
                          
                      </mesh>
          }
          {props.skin == "wall_1" && <mesh ref={itemRef}  geometry={nodes.wall_1.geometry} material={mat} position={[props.x,0,props.z]}/>}
      </group>
      
      </>
            
      
  )
}

export function ItemType1Model(props)
{
  //GERE LES UTEMS SPRITE SUR LA MAP Y COMPRIS LES ITEMS QUE LES MOBS
  let _appContext = useContext(appContext)
  let paticleTexture;
  let spriteRef = useRef(null);
  let passedTime = 0;

  if(props.skin == 'cauris_item')
  {
    paticleTexture = useTexture('caurisTXT.png');
  }
  useEffect(()=>
    { 
      props.controller.itemController.value[props.controller.index] = (args)=>
      {
          if(args == 'SHOW-ITEM')
          {
              spriteRef.current.visible = true;
          }
          else if(args == 'REMOVE-ITEM')
          {
              spriteRef.current.visible = false;
          }
      } 
    },[])
  useFrame((clock)=>
    {
        if(!_appContext.gamePause.current)
        {passedTime += 1/40;
        spriteRef.current.children[0].position.y += Math.sin(passedTime)/400;}
    })
  return(     <>
              <group ref={spriteRef} visible={props._visible} >
                    <sprite 
                      position={[props.x,0.5,props.z]} scale={[0.3,0.4,1]}
                    >
                      <spriteMaterial map={paticleTexture}   />
                      
                    </sprite>
                    <CustomParticle _skin={'star_07.png'} _size={0.5} _color={'white'}  _speed={1} _number={15} x={props.x} z={props.z} />
              </group>
              </>
  )
}
function CustomParticle(props)
{
  let _appContext = useContext(appContext)
  const { nodes, materials } = useGLTF('/model.glb');
  let paticleTexture = useTexture(`particleRes/${props._skin}`);
  let objRef = useRef(null);
  let pointRef = useRef(null)
  let particlesContainer =[];
  let particlesInfo = [];

      for(let i =0;i<props._number;i++)
      {
        particlesInfo[i] = {start:false,timer:Math.floor(Math.random()*80),limit:1.1}
        particlesInfo[i].start = particlesInfo[i].timer ==0? true : false
        particlesContainer[i] = <sprite key={i} 
                                  position={[(Math.random()*0.9)-0.5
                                    ,0
                                    ,(Math.random()*0.9)-0.5]} scale={Math.random()*props._size}
                                >
                                  <spriteMaterial visible={false} color={props._color} alphaMap={paticleTexture} depthWrite={true}  />
                                </sprite>
      }  
  
  useFrame(()=>
    { 
      if(!_appContext.gamePause.current)
      
      {
          for(let i =0;i<pointRef.current.children.length;i++)
          {
            if(particlesInfo[i].start)
            {
              pointRef.current.children[i].position.y += 0.01*props._speed;
              pointRef.current.children[i].material.visible = true
              if(pointRef.current.children[i].position.y >= particlesInfo[i].limit )
              {
                particlesInfo[i].start = false;
                particlesInfo[i].timer = Math.floor(Math.random()*80);
                let scaleValue = Math.random()*props._size
                pointRef.current.children[i].scale.set(scaleValue,scaleValue,scaleValue)
                pointRef.current.children[i].material.visible = false;
                pointRef.current.children[i].position.y = 0;
              }
              // console.log(pointRef.current.children[i].position.y)
            }
            else
            {
              particlesInfo[i].timer --;
              if(particlesInfo[i].timer<=0)
              {
                particlesInfo[i].start = true;
              }
            }
            // pointRef.current.children[i].material.rotation += 0.01;
          }
      }
      
    })
  return(
        <group
          name='PARTICLE GROUP CONTAINER'
          position={[props.x,0.2,props.z]}
          ref={pointRef}
        >
            {particlesContainer}
        </group>
  )
}

export function ExitDoor_model(props)
{
  const { nodes, materials } = useGLTF('/model.glb');
  let texturemat = prepareTexture('gametexture.jpg');
  let visibleStatut;
  let passedTime = 0;
  let faceRef = useRef(null)
  let mat_0 = new THREE.MeshBasicMaterial({map:texturemat});
  let mat = new THREE.ShaderMaterial({transparent:true ,vertexShader:vertex,fragmentShader:frags,side:THREE.DoubleSide
    ,uniforms:{utime:{value:0.2},uColor:{value:new THREE.Vector3(1,0,0)}}
})
  
  useFrame((clock)=>{
    faceRef.current.material.uniforms.utime.value += 0.05;

  })

  useEffect(()=>
    { 
      if(props.isOpen)
      {
        faceRef.current.material.uniforms.uColor.value.x = 0.0;
        faceRef.current.material.uniforms.uColor.value.z = 1.0;
      }
      props.controller.exitDoorController.value[props.controller.index] = (args)=>
      {
          if(args == 'OPEN-DOOR')
          {
            faceRef.current.material.uniforms.uColor.value.x = 0.0;
            faceRef.current.material.uniforms.uColor.value.z = 1.0;
          }
      } 
    },[])
  return(
    
    <mesh geometry={nodes.door_1.geometry} material={mat_0} position={[props.x,0,props.z]}>
            <mesh ref={faceRef} geometry={nodes.door_1_face1.geometry} material={mat} position={[0, 1.018, -0.746]} rotation={[-Math.PI / 2, 0, 0]} scale={[0.746, 1, 0.892]} />
            <mesh geometry={nodes.door_1_face2.geometry} material={mat} position={[0.752, 1.018, 0.005]} rotation={[0, 0, -Math.PI / 2]} scale={[0.862, 1, 0.75]} />
            <mesh geometry={nodes.door_1_face3.geometry} material={mat} position={[-0.748, 1.018, 0.005]} rotation={[-Math.PI, 0, Math.PI / 2]} scale={[0.862, 1, 0.75]} />
            <mesh geometry={nodes.door_1_face4.geometry} material={mat} position={[0, 1.018, 0.754]} rotation={[-Math.PI / 2, Math.PI / 2, 0]} scale={[0.862, 1, 0.761]} />
    </mesh>
    // <mesh rotation={[Math.PI*0.5,0,0]} position={[props.x,1,props.z]} material={mat}>
    //       <boxGeometry args={[2,2,2]} />
    //       <meshBasicMaterial color={'red'} wireframe={true} />
    // </mesh>
    
  )
}

export function Mob_1_model(props) {
  let _appContext = useContext(appContext);
  let _mobContext = useContext(mobContext)
  const { nodes, materials } = useGLTF('/model.glb');
  let _texture = prepareTexture('gametexture.jpg');
  // let mat = new THREE.MeshBasicMaterial({map:_texture});
  const mat = new THREE.MeshMatcapMaterial({color:'red'})
  let modelRef = useRef(null);
  let mobHitManager = {startEffect:false,timer:10,effectCount:0}
  let visibleStatut;
  let passedTime = 0;
  let mobShakeFromLeft = false;
  let mobInitialPos = 0;
  let mobShakeAnimationStart = false;
  let shakeBrick = ()=>
    { 
      let value = mobShakeFromLeft? -0.2 : 0.2;
      mobShakeFromLeft = mobShakeFromLeft? false : true;
      modelRef.current.position.x = modelRef.current.position.x + value
    }
  let shakeBrickCallBack = ()=>
    { 
      modelRef.current.position.x = mobInitialPos
      mobShakeAnimationStart = false;
    }
  useFrame(()=>
    {
      if(!_appContext.gamePause.current)
      { passedTime += 1/40;
        modelRef.current.position.y += Math.sin(passedTime)/400;

        if(mobHitManager.startEffect)
          {
            mobHitManager.timer--;
            if(mobHitManager.timer == 0)
            {
              mobHitManager.effectCount ++;
              mobHitManager.timer = 10;
              
              if(mobHitManager.effectCount<7)
              { 
                modelRef.current.children[0].visible = modelRef.current.children[0].visible? false : true;
              }
              else
              {
                mobHitManager.effectCount = 0;
                mobHitManager.startEffect = false;
                modelRef.current.children[0].visible = false;
              }
              
            }
          }
      }
    })
  useEffect(()=>
    {
      _mobContext.enemyFunc.current = (args)=>
        {
          if(args == 'REMOVE-MOB')
          {
            modelRef.current.material.visible = false;
          }
          else if(args == 'SHAKE-MOB')
          {
              
          }
          else if(args == 'MOB-TOUCHED')
          { 
            if(!mobShakeAnimationStart)
            {
              mobShakeAnimationStart = true
              mobInitialPos = modelRef.current.position.x
              let customCounter = new CustomCounter(4,7,shakeBrick,shakeBrickCallBack)
              customCounter.start();
            }
            
            // modelRef.current.children[0].visible = false;
            // mobHitManager = {startEffect:false,timer:10,effectCount:0}
            // mobHitManager.startEffect = true
          }
          else if(args == 'MOB-ROTATE-LEFT')
          {
            modelRef.current.rotation.y = Math.PI*0.5
          }
          else if(args == 'MOB-ROTATE-RIGHT')
          {
            modelRef.current.rotation.y = -Math.PI*0.5
          }
          else if(args == 'MOB-ROTATE-FRONT')
          {
            modelRef.current.rotation.y = 0
          }
          else if(args == 'MOB-ROTATE-BACK')
          {
            modelRef.current.rotation.y = Math.PI
          }
        }
    },[])
  
  return (

        
          // <mesh ref={modelRef} geometry={nodes.mob_1.geometry} material={mat} position={[props.x,0.1,props.z]} rotation={[-Math.PI, 0, -Math.PI]}>
          //       <mesh geometry={nodes.mob_1.geometry} visible={false} scale={1}>
          //           <meshBasicMaterial color={'red'}  />
          //      </mesh>
          // </mesh>
          <>
              <mesh ref={modelRef} geometry={nodes.pmob_1.geometry} material={mat} position={[props.x,0.1,props.z]} rotation={[0,Math.PI, 0]}>
                    {/* <mesh geometry={nodes.mob_1.geometry} visible={false} scale={1}>
                        <meshBasicMaterial color={'red'}  />
                  </mesh> */}
                    
              </mesh>
              <mesh position={[props.x,0.1,props.z]} visible={false}
              >
                  <boxGeometry args={[2,2,2]}  />
                  <meshBasicMaterial wireframe color={'red'} />
                  <BulletCollisionEffect />
              </mesh>
          </>
         
            
      
  )
}
export function Barier_Model(props)
{
  let _gameAppContext = useContext(gameAppContext)
  const { nodes, materials } = useGLTF('/model.glb');
  let _texture = useTexture('texture1.jpg');
  _texture.flipY = false;
  _texture.colorSpace = THREE.SRGBColorSpace; 
  _texture.minFilter = THREE.LinearFilter;
  _texture.magFilter = THREE.LinearFilter;
  let mat = new THREE.MeshBasicMaterial({map:_texture});
  let groupRef = useRef(null)
  let modelRef = useRef(null)
  let modelFunc = (args)=>
      {
          if(args == "hide")
          { 
            groupRef.current.visible = true;
            let customCounter = new CustomCounter(100,1,()=>
              {
                 modelRef.current.material.visible = false;
                 groupRef.current.visible = false;
              });
            
            customCounter.start();
            
          }
      }
  useEffect(()=>
    {
      if(props._for=='barier')
      {
        for(let i =0;i<_gameAppContext.barierModelIndexArr.value.length;i++)
          {
            if(_gameAppContext.barierModelIndexArr.value[i].objectId == props.refID)
            {
              _gameAppContext.barierModelIndexArr.value[i].ModelFunc = modelFunc;
            }
          }
      }
      
      else if(props._for=='exit')
      {
        // objectRef.current[exitDoorModelIndexArr.value[i].objectId].children[0].material.visible = false;
        
        for(let i =0;i<_gameAppContext.exitDoorModelIndexArr.value.length;i++)
          {
            if(_gameAppContext.exitDoorModelIndexArr.value[i].objectId == props.refID)
            {
              _gameAppContext.exitDoorModelIndexArr.value[i].modelFunc = modelFunc;
            }
          }
        
      }
      
    },[])
  return(     <>
              <mesh ref={modelRef} geometry={nodes.barier.geometry} scale={0.6} material={mat} position={[props.x,0,props.z]} rotation={[-Math.PI, 1.484, -Math.PI]} />
              <group
                    ref={groupRef}
                    visible={false}
              >
                  <CustomParticle _skin={'smoke_06.png'} _size={1.5} _color={'white'} _speed={3} _number={10} x={props.x} z={props.z} />
              </group>
              
              </>
  )
}
export function EnemyBullet(props)
{
  let bulletTXT = useTexture('ennemyBulletTxt.png');
  bulletTXT.flipY = false;
  bulletTXT.colorSpace = THREE.SRGBColorSpace; 
  bulletTXT.minFilter = THREE.LinearFilter;
  bulletTXT.magFilter = THREE.LinearFilter;

  return(
          <>
                   <mesh
                        key={props._i}
                        ref={props._ref}
                        position={props._position}
                    >
                        <sphereGeometry args={[0.2,10,10]} />
                        <meshBasicMaterial visible={false} map={bulletTXT} />
                    </mesh>
          </>
  )
}

export function BulletCollisionEffect(props)
{
  let paticleTexture = useTexture(`particleRes/star_07.png`);
  return(
    <>
    <sprite 
    position={[0
      ,1
      ,-0.7]} scale={0.15}
    >
    <spriteMaterial visible={true} color={'white'} depthWrite={true}  />
    </sprite>
    <sprite 
    position={[0.16
      ,1
      ,-0.7]} scale={0.15}
    >
    <spriteMaterial visible={true} color={'white'} depthWrite={true}  />
    </sprite>
    <sprite 
    position={[0
      ,0.85
      ,-0.7]} scale={0.15}
    >
    <spriteMaterial visible={true} color={'white'} depthWrite={true}  />
    </sprite>
    <sprite 
    position={[0.16
      ,0.85
      ,-0.7]} scale={0.15}
    >
    <spriteMaterial visible={true} color={'white'} depthWrite={true}  />
    </sprite>
    </>
  )
}
useGLTF.preload('/model.glb')
