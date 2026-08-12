import { type AnyStateMachine, setup } from 'xstate';
import type { AnimEvent, App, CanvasPointerEvent, SceneReadyEvent } from 'illutions';

import { classes } from './classes';

// Define marker interaction, camera animation, and orbit control behavior with a state machine
export function createStateMachine(app: App<typeof classes>): AnyStateMachine {
  const { comps, engine, objs3D, orbitCtrls, raycast } = app;

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
      animM0Cam: () => engine.animCamCurveTo({ camTarget: 'M0Cam', aimTarget: 'M0Aim', radiusOut: 0.5 }),
      animM1Cam: () => engine.animCamCurveTo({ camTarget: objs3D.M1Cam, aimTarget: objs3D.M1Aim, radiusOut: 0.5 }),
      animM2Cam: () => engine.animCamCurveTo({ camTarget: objs3D.M2Cam, aimTarget: objs3D.M2Aim, radiusOut: 0.5 }),
      animM3Cam: () => engine.animCamCurveTo({ camTarget: objs3D.M3Cam, aimTarget: objs3D.M3Aim, radiusOut: 0.5 }),
      animM4Cam: () => engine.animCamCurveTo({ camTarget: objs3D.M4Cam, aimTarget: objs3D.M4Aim, radiusOut: 1 }),
      // Keep each HTML marker aligned with its 3D aim
      followAims: () => {
        comps.M1[0].follow({ obj: objs3D.M1Aim });
        comps.M2[0].follow({ obj: objs3D.M2Aim });
        comps.M3[0].follow({ obj: objs3D.M3Aim });
        comps.M4[0].follow({ obj: objs3D.M4Aim });
      },
      // Keep visible markers from overlapping
      trackOverlaps: () => {
        comps.M1[0].trackOverlap();
        comps.M2[0].trackOverlap();
        comps.M3[0].trackOverlap();
        comps.M4[0].trackOverlap();
      },
      // Suspend orbit controls during camera transitions
      disableOrbitCtrls: () => orbitCtrls.disable(),
      enableOrbitCtrls: () => orbitCtrls.enable(),
      // Use the hidden low-poly watch as the marker occlusion mesh
      setOccluders: () => {
        objs3D.WatchLP.obj.visible = false;
        raycast.setOccluders({ objs3D: [objs3D.WatchLP] });
      },
    },
  }).createMachine({
    id: 'App',
    initial: 'INIT',
    states: {
      INIT: {
        on: {
          Scene_Ready: {
            target: 'ORBIT',
            actions: ['setOccluders', 'followAims', 'trackOverlaps'],
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
}
