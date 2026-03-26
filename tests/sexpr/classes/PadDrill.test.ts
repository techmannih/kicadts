import { PadDrill, SxClass } from "lib/sexpr"
import { expect, test } from "bun:test"

test("PadDrill parsing and getString", () => {
  // Test circle drill
  const [padCircle] = SxClass.parse(
    `(pad "1" thru_hole circle (drill 0.5))`,
  ) as any
  const drillCircle = padCircle.drill
  expect(drillCircle).toBeInstanceOf(PadDrill)
  const padDrillCircle = drillCircle as PadDrill
  expect(padDrillCircle.oval).toBe(false)
  expect(padDrillCircle.rect).toBe(false)
  expect(padDrillCircle.diameter).toBe(0.5)
  expect(padDrillCircle.width).toBeUndefined()
  expect(padDrillCircle.getString()).toBe("(drill 0.5)")

  // Test oval drill
  const [padOval] = SxClass.parse(
    `(pad "1" thru_hole circle (drill oval 0.5 0.8))`,
  ) as any
  const drillOval = padOval.drill
  expect(drillOval).toBeInstanceOf(PadDrill)
  const padDrillOval = drillOval as PadDrill
  expect(padDrillOval.oval).toBe(true)
  expect(padDrillOval.rect).toBe(false)
  expect(padDrillOval.diameter).toBe(0.5)
  expect(padDrillOval.width).toBe(0.8)
  expect(padDrillOval.getString()).toBe("(drill oval 0.5 0.8)")

  // Test rect drill
  const [padRect] = SxClass.parse(
    `(pad "1" thru_hole circle (drill rect 0.6 0.9))`,
  ) as any
  const drillRect = padRect.drill
  expect(drillRect).toBeInstanceOf(PadDrill)
  const padDrillRect = drillRect as PadDrill
  expect(padDrillRect.oval).toBe(false)
  expect(padDrillRect.rect).toBe(true)
  expect(padDrillRect.diameter).toBe(0.6)
  expect(padDrillRect.width).toBe(0.9)
  expect(padDrillRect.getString()).toBe("(drill rect 0.6 0.9)")
})

test("PadDrill setters", () => {
  const drill = new PadDrill({ diameter: 0.5 })
  expect(drill.getString()).toBe("(drill 0.5)")

  drill.oval = true
  drill.width = 0.8
  expect(drill.getString()).toBe("(drill oval 0.5 0.8)")
  expect(drill.rect).toBe(false)

  drill.rect = true
  expect(drill.oval).toBe(false)
  expect(drill.getString()).toBe("(drill rect 0.5 0.8)")

  drill.oval = true
  expect(drill.rect).toBe(false)
  expect(drill.getString()).toBe("(drill oval 0.5 0.8)")
})
