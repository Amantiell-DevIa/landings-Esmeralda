#!/usr/bin/env node

/**
 * build.js — Script de construcción que ensambla la landing page
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '..', 'src');
const DIST_DIR = path.join(__dirname, '..', 'dist');
const BLOCKS_DIR = path.join(SRC_DIR, 'blocks');
const TEMPLATE_FILE = path.join(SRC_DIR, 'templates', 'index.template.html');

// Leer bloques en orden
const blockFiles = [
  'block-01.html',
  'block-02.html',
  'block-03.html',
  'block-04.html',
  'block-05.html',
  'block-06.html',
  'block-07.html',
  'block-08.html',
  'block-09.html',
  'block-10.html',
  'block-11.html',
  'block-12.html',
  'block-13.html',
  'block-14.html'
];

function readBlock(filename) {
  const filePath = path.join(BLOCKS_DIR, filename);
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, 'utf8');
  }
  console.warn(`Warning: Block file not found: ${filePath}`);
  return '';
}

function generateJSONLD() {
  const currentYear = new Date().getFullYear();
  
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "name": "Círculo Gold",
        "url": "https://circulogold.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://circulogold.com/logo.png"
        }
      },
      {
        "@type": "Person",
        "name": "Shenoa",
        "alternateName": "ElReydel18K",
        "description": "Experto en inversión en joyería y oro"
      },
      {
        "@type": "Person",
        "name": "BlingBling",
        "description": "Experto en inversión en piedras preciosas y relojes"
      },
      {
        "@type": "Course",
        "name": "Círculo Gold",
        "description": "No se trata de la pieza. Se trata de qué haces con ella.",
        "offers": {
          "@type": "Offer",
          "price": "297",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        }
      },
      {
        "@type": "Course",
        "name": "Círculo Acero",
        "description": "UNA FORMA MÁS LIGERA DE EMPEZAR",
        "offers": {
          "@type": "Offer",
          "price": "97",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "¿NECESITO MUCHO DINERO PARA COMENZAR?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. Aprendes a analizar posibilidades acordes con tu punto de partida antes de mover la plata."
            }
          },
          {
            "@type": "Question",
            "name": "¿Y SI NUNCA HE COMPRADO ORO?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No necesitas llegar sabiendo. Empiezas por aprender qué mirar, qué preguntar y qué revisar."
            }
          },
          {
            "@type": "Question",
            "name": "¿CÓMO SÉ QUE NO ME VAN A METER UN CUENTO?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ninguna formación elimina el riesgo, pero sí puedes aprender qué validar y qué señales revisar."
            }
          },
          {
            "@type": "Question",
            "name": "¿TENGO QUE MONTAR UNA TIENDA DE JOYAS DE UNA?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. La tienda es una posibilidad dentro de Gold, no una obligación para empezar."
            }
          },
          {
            "@type": "Question",
            "name": "¿CÍRCULO GOLD GARANTIZA QUE VOY A GANAR DINERO?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. Tus resultados dependen de tus decisiones, tu capital, el mercado y tu ejecución."
            }
          },
          {
            "@type": "Question",
            "name": "¿CUÁL DEBERÍA ELEGIR?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Gold reúne el entorno completo. Acero es una entrada más ligera centrada en las bases."
            }
          }
        ]
      }
    ]
  };
  
  return JSON.stringify(schemaGraph, null, 2);
}

function build() {
  console.log('🔨 Building Círculo Gold Landing Page...\n');
  
  // Crear directorio dist si no existe
  if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
  }
  
  // Leer template
  let html = fs.readFileSync(TEMPLATE_FILE, 'utf8');
  
  // Reemplazar placeholders de bloques
  blockFiles.forEach((file, index) => {
    const blockContent = readBlock(file);
    const placeholder = `<!-- BLOCK:${String(index + 1).padStart(2, '0')} -->`;
    html = html.replace(placeholder, blockContent);
  });
  
  // Insertar JSON-LD
  const jsonLd = generateJSONLD();
  html = html.replace('<script type="application/ld+json" id="schema-graph"></script>', 
    `<script type="application/ld+json" id="schema-graph">${jsonLd}</script>`);
  
  // Escribir archivo final
  const outputFile = path.join(DIST_DIR, 'index.html');
  fs.writeFileSync(outputFile, html, 'utf8');
  
  console.log('✅ Build completed successfully!');
  console.log(`📁 Output: ${outputFile}\n`);
  
  // Copiar assets
  const srcAssetsDir = path.join(SRC_DIR, 'data');
  const distDataDir = path.join(DIST_DIR, 'src', 'data');
  
  if (!fs.existsSync(distDataDir)) {
    fs.mkdirSync(distDataDir, { recursive: true });
  }
  
  fs.copyFileSync(path.join(srcAssetsDir, 'config.json'), path.join(distDataDir, 'config.json'));
  console.log('📋 Config copied to dist folder');
  
  // Listar archivos generados
  console.log('\n📦 Generated files:');
  const files = fs.readdirSync(DIST_DIR);
  files.forEach(f => console.log(`   - ${f}`));
}

// Ejecutar build
build();
