import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { JazziconComponent } from './jazzicon.component';
import { JazziconService } from './jazzicon.service';
import { JazziconConfig, JazziconServiceConfig } from './jazzicon.token';

const defaultConfig: JazziconConfig = { 
  diameter: 100, 
  shapeCount: 4, 
  colors: [
    '#01888C', // teal
    '#FC7500', // bright orange
    '#034F5D', // dark teal
    '#F73F01', // orangered
    '#FC1960', // magenta
    '#C7144C', // raspberry
    '#F3C100', // goldenrod
    '#1598F2', // lightning blue
    '#2465E1', // sail blue
    '#F19E02' // gold
  ] 
};

@NgModule({
  imports: [CommonModule],
  declarations: [
    JazziconComponent
  ],
  exports: [
    JazziconComponent
  ]
})
export class JazziconModule {
  static forRoot(config: Partial<JazziconConfig> = {}): ModuleWithProviders<JazziconModule> {
    return {
      ngModule: JazziconModule,
      providers: [
        JazziconService,
        { 
          provide: JazziconServiceConfig,
          useValue: { ...defaultConfig, ...config }
        }
      ]
    };
  }
}