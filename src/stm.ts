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
        | { type: 'M1_CLICK' }
        | { type: 'M2_CLICK' }
        | { type: 'M3_CLICK' }
        | { type: 'M4_CLICK' };
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
    initial: 'Init',
    states: {
      Init: {
        on: {
          SCENE_READY: {
            target: 'Orbit',
            actions: ['setOccluders', 'followAims', 'trackOverlaps'],
          },
        },
      },
      Orbit: {
        entry: ['enableOrbitCtrls'],
        exit: ['disableOrbitCtrls'],
        on: {
          CANVAS_CLICK: { target: 'AnimM0' },
          M1_CLICK: { target: 'AnimM1' },
          M2_CLICK: { target: 'AnimM2' },
          M3_CLICK: { target: 'AnimM3' },
          M4_CLICK: { target: 'AnimM4' },
        },
      },
      AnimM0: {
        entry: ['animM0Cam'],
        on: {
          ANIM_COMPLETE: { target: 'Orbit' },
        },
      },
      AnimM1: {
        entry: ['animM1Cam'],
        on: {
          ANIM_COMPLETE: { target: 'Orbit' },
        },
      },
      AnimM2: {
        entry: ['animM2Cam'],
        on: {
          ANIM_COMPLETE: { target: 'Orbit' },
        },
      },
      AnimM3: {
        entry: ['animM3Cam'],
        on: {
          ANIM_COMPLETE: { target: 'Orbit' },
        },
      },
      AnimM4: {
        entry: ['animM4Cam'],
        on: {
          ANIM_COMPLETE: { target: 'Orbit' },
        },
      },
    },
  });
}
