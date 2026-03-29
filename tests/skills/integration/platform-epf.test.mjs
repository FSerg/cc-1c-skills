// platform-epf.test.mjs — Integration test: EPF build/dump roundtrip
// Requires: 1C platform (1cv8.exe) via .v8-project.json
// Steps: epf-init (no forms) → epf-build → epf-dump

export const name = 'Сборка и разборка внешней обработки (roundtrip)';
export const setup = 'none';
export const requiresPlatform = true;

export const steps = [
  // ── 1. Create EPF without forms (avoids ExtendedPresentation issue) ──
  {
    name: 'epf-init: пустая обработка',
    script: 'epf-init/scripts/init',
    args: { '-Name': 'RoundtripТест', '-SrcDir': '{workDir}' },
  },

  // ── 2. Build EPF binary ──
  {
    name: 'epf-build: сборка EPF',
    script: 'epf-build/scripts/epf-build',
    args: {
      '-V8Path': '{v8path}',
      '-SourceFile': '{workDir}/RoundtripТест.xml',
      '-OutputFile': '{workDir}/RoundtripТест.epf',
    },
  },

  // ── 3. Create temp DB for dump (epf-dump requires database connection) ──
  {
    name: 'db-create: временная ИБ для разборки',
    script: 'db-create/scripts/db-create',
    args: { '-V8Path': '{v8path}', '-InfoBasePath': '{workDir}/tmpdb' },
  },

  // ── 4. Dump EPF back to XML ──
  {
    name: 'epf-dump: разборка EPF в XML',
    script: 'epf-dump/scripts/epf-dump',
    args: {
      '-V8Path': '{v8path}',
      '-InputFile': '{workDir}/RoundtripТест.epf',
      '-OutputDir': '{workDir}/roundtrip-dump',
      '-InfoBasePath': '{workDir}/tmpdb',
    },
  },
];
