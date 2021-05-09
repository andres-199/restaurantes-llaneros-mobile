import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '../guards/login.guard';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'purchases',
        loadChildren: () =>
          import('../purchases/purchases.module').then(
            (r) => r.PurchasesPageModule
          ),
        canActivate: [LoginGuard],
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('../cart/tab2.module').then((m) => m.Tab2PageModule),
        canActivate: [LoginGuard],
      },
      {
        path: 'time',
        loadChildren: () =>
          import('../time/time.module').then((m) => m.TimePageModule),
        canActivate: [LoginGuard],
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
