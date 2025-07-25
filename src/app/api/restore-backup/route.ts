/**
 * BACKUP RESTORATION SCRIPT
 * 
 * This script helps restore the Posts.ts configuration from backups
 * 
 * Available Backups:
 * 1. Posts-enhanced-markdown-stable.ts - Full markdown features (STABLE)
 * 2. Posts-simple.ts - Basic features only (MINIMAL)
 * 3. Posts-backup.ts - Original complex version (EXPERIMENTAL)
 * 
 * Usage: When you want to restore, tell me "take me backup" and specify which version:
 * - "enhanced markdown" -> Restore full markdown features
 * - "simple" -> Restore basic features only
 * - "experimental" -> Restore original complex version
 */

import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const { backupType } = await request.json()
    
    const projectRoot = path.resolve(process.cwd())
    const postsPath = path.join(projectRoot, 'src', 'collections', 'Posts.ts')
    
    let backupPath: string
    let description: string
    
    switch (backupType) {
      case 'enhanced-markdown':
        backupPath = path.join(projectRoot, 'src', 'collections', 'Posts-enhanced-markdown-stable.ts')
        description = 'Enhanced Markdown Features (STABLE)'
        break
      case 'simple':
        backupPath = path.join(projectRoot, 'src', 'collections', 'Posts-simple.ts')
        description = 'Basic Features Only (MINIMAL)'
        break
      case 'experimental':
        backupPath = path.join(projectRoot, 'src', 'collections', 'Posts-backup.ts')
        description = 'Original Complex Version (EXPERIMENTAL)'
        break
      default:
        return NextResponse.json({ 
          success: false, 
          error: 'Invalid backup type. Use: enhanced-markdown, simple, or experimental' 
        }, { status: 400 })
    }
    
    // Check if backup exists
    if (!fs.existsSync(backupPath)) {
      return NextResponse.json({ 
        success: false, 
        error: `Backup file not found: ${backupPath}` 
      }, { status: 404 })
    }
    
    // Create backup of current file
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const currentBackupPath = path.join(projectRoot, 'src', 'collections', `Posts-backup-${timestamp}.ts`)
    
    if (fs.existsSync(postsPath)) {
      fs.copyFileSync(postsPath, currentBackupPath)
    }
    
    // Restore from backup
    fs.copyFileSync(backupPath, postsPath)
    
    return NextResponse.json({ 
      success: true, 
      message: `Successfully restored Posts.ts from ${description}`,
      currentBackup: `Posts-backup-${timestamp}.ts`
    })
    
  } catch (error) {
    console.error('Error restoring backup:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}
