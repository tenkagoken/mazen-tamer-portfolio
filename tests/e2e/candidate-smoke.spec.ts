import { expect, test } from '@playwright/test'

test('candidate can inspect proof, open contact routes, and retrieve the approved resume', async ({ context, page }) => {
  const browserErrors: string[] = []
  page.on('pageerror', (error) => browserErrors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') browserErrors.push(message.text())
  })

  await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: 'http://127.0.0.1:4174' })
  await page.goto('/mazen-tamer-portfolio/', { waitUntil: 'networkidle' })
  await expect(page.locator('main')).toBeVisible()

  const sectionIds = await page.locator('main > section').evaluateAll((sections) => sections.map((section) => section.id))
  expect(sectionIds).toEqual(['home', 'projects', 'about', 'skills', 'journey', 'contact'])

  const excludedCopy = (await page.locator('body').innerText()).toLowerCase()
  expect(excludedCopy).not.toContain('knights end')
  expect(excludedCopy).not.toContain('lebaladna')
  expect(excludedCopy).not.toContain('survey helper')

  await page.getByRole('button', { name: /inspect evidence/i }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Close project details' })).toBeFocused()
  await expect(page.getByText('Known limitation')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toHaveCount(0)

  const email = page.getByRole('link', { name: /^Email mazentamerelsay/i })
  await expect(email).toHaveAttribute('href', 'mailto:mazentamerelsay@gmail.com')
  await expect(page.getByRole('link', { name: /^LinkedIn/i })).toHaveAttribute('href', /^https:\/\/www\.linkedin\.com\//)

  await page.getByRole('button', { name: /copy email/i }).click()
  await expect(page.getByText('Copied to clipboard')).toBeVisible()

  const resumeHref = await page.getByRole('link', { name: /^Résumé/i }).getAttribute('href')
  expect(resumeHref).toBe('/mazen-tamer-portfolio/Mazen-Eladawy-Resume.pdf')
  const resumeResponse = await page.request.get(resumeHref!)
  expect(resumeResponse.ok()).toBe(true)
  expect(resumeResponse.headers()['content-type']).toContain('application/pdf')

  expect(browserErrors).toEqual([])
})
