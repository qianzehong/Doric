package pub.doric;

import android.content.Context;
import android.os.Build;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;
import android.util.AttributeSet;
import android.widget.FrameLayout;

/**
 * @Description: Doric
 * @Author: pengfei.zhou
 * @CreateDate: 2019-07-18
 */
public class DoricPanel extends FrameLayout {

    private DoricContext mDoricContext;

    public DoricPanel(@NonNull Context context) {
        super(context);
    }

    public DoricPanel(@NonNull Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
    }

    public DoricPanel(@NonNull Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    public DoricPanel(@NonNull Context context, @Nullable AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
    }

    public void config(String script, String alias) {
        DoricContext doricContext = DoricContext.create(getContext(), script, alias);
        config(doricContext);
    }

    public void config(DoricContext doricContext) {
        mDoricContext = doricContext;
    }

    @Override
    protected void onFinishInflate() {
        super.onFinishInflate();
    }

    public DoricContext getDoricContext() {
        return mDoricContext;
    }
}
