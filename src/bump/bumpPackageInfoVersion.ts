import { BumpInfo } from '../types/BumpInfo';
import semver from 'semver';
import { BeachballOptions } from '../types/BeachballOptions';

/**
 * Bumps an individual package version based on the change type
 */
export function bumpPackageInfoVersion(pkgName: string, bumpInfo: BumpInfo, options: BeachballOptions): void {
  const { calculatedChangeTypes, packageInfos, modifiedPackages } = bumpInfo;
  const info = packageInfos[pkgName];
  const changeType = calculatedChangeTypes[pkgName];

  if (!info) {
    console.log(`Unknown package named "${pkgName}" detected from change files, skipping!`);
  } else if (changeType === 'none') {
    console.log(`"${pkgName}" has a "none" change type, no version bump is required.`);
  } else if (info.private) {
    console.log(`Skipping bumping private package "${pkgName}"`);
  } else {
    // Version should be updated
    info.version = semver.inc(
      info.version,
      options.prereleasePrefix ? 'prerelease' : changeType,
      options.prereleasePrefix || undefined
    ) as string;
    modifiedPackages.add(pkgName);
  }
}
