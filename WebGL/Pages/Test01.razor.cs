using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System;
using System.Collections.Generic;

namespace WebGL.Pages
{

    public partial class Test01 :ComponentBase 
    {
        [Inject] IJSRuntime js { get; set; }
        protected override void OnInitialized()
        {

        }

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                await this.js.InvokeVoidAsync("Test01.run");
            }
        }
    }


}
