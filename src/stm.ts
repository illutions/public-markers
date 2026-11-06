import { type AnyStateMachine, setup } from 'xstate';

import type { AnimEvent, CanvasPointerEvent, SceneReadyEvent } from 'illutions';

import type { MyApp } from './index';


// Define marker interaction, camera animation, and orbit control behavior with a state machine
export const stm = (app: MyApp): AnyStateMachine => {
  const { comps, orbitCtrls, scene } = app;

  return setup({
    types: {} as {
      events:
        | AnimEvent
        | CanvasPointerEvent
        | SceneReadyEvent
        | { type: 'M1_Click' }
        | { type: 'M2_Click' }
        | { type: 'M3_Click' }
        | { type: 'M4_Click' };
    },
    actions: {
      // Animate the camera between the overview and watch details
      animM0Cam: () => scene.animCamCurveTo({ camTarget: 'M0Cam', aimTarget: 'M0Aim', radiusOut: 0.5 }),
      animM1Cam: () => scene.animCamCurveTo({ camTarget: comps.scene.m1Cam, aimTarget: comps.scene.m1Aim, radiusOut: 0.5 }),
      animM2Cam: () => scene.animCamCurveTo({ camTarget: comps.scene.m2Cam, aimTarget: comps.scene.m2Aim, radiusOut: 0.5 }),
      animM3Cam: () => scene.animCamCurveTo({ camTarget: comps.scene.m3Cam, aimTarget: comps.scene.m3Aim, radiusOut: 0.5 }),
      animM4Cam: () => scene.animCamCurveTo({ camTarget: comps.scene.m4Cam, aimTarget: comps.scene.m4Aim, radiusOut: 1 }),
      
      // Keep each HTML marker aligned with its 3D aim
      followAims: () => {
        comps.web.m1[0].follow({ obj: comps.scene.m1Aim });
        comps.web.m2[0].follow({ obj: comps.scene.m2Aim });
        comps.web.m3[0].follow({ obj: comps.scene.m3Aim });
        comps.web.m4[0].follow({ obj: comps.scene.m4Aim });
      },
      
      // Keep visible markers from overlapping
      trackWebOverlaps: () => {
        comps.web.m1[0].trackOverlap();
        comps.web.m2[0].trackOverlap();
        comps.web.m3[0].trackOverlap();
        comps.web.m4[0].trackOverlap();
      },
      
      // Suspend orbit controls during camera transitions
      disableOrbitCtrls: () => orbitCtrls.disable(),
      enableOrbitCtrls: () => orbitCtrls.enable(),
      
    },
  }).createMachine({
    id: 'App',
    initial: 'INIT',
    states: {
      INIT: {
        on: {
          Scene_Ready: {
            target: 'ORBIT',
            actions: ['followAims', 'trackWebOverlaps'],
          },
        },
      },
      ORBIT: {
        entry: ['enableOrbitCtrls'],
        exit: ['disableOrbitCtrls'],
        on: {
          Canvas_Click: { target: 'ANIM_M0' },
          M1_Click: { target: 'ANIM_M1' },
          M2_Click: { target: 'ANIM_M2' },
          M3_Click: { target: 'ANIM_M3' },
          M4_Click: { target: 'ANIM_M4' },
        },
      },
      ANIM_M0: {
        entry: ['animM0Cam'],
        on: {
          Anim_Complete: { target: 'ORBIT' },
        },
      },
      ANIM_M1: {
        entry: ['animM1Cam'],
        on: {
          Anim_Complete: { target: 'ORBIT' },
        },
      },
      ANIM_M2: {
        entry: ['animM2Cam'],
        on: {
          Anim_Complete: { target: 'ORBIT' },
        },
      },
      ANIM_M3: {
        entry: ['animM3Cam'],
        on: {
          Anim_Complete: { target: 'ORBIT' },
        },
      },
      ANIM_M4: {
        entry: ['animM4Cam'],
        on: {
          Anim_Complete: { target: 'ORBIT' },
        },
      },
    },
  });
};
